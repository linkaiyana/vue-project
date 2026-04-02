/*
 * @Author: linkaiyan
 * @Date: 2026-03-17 17:38:29
 * @LastEditTime: 2026-04-02 09:53:10
 * @LastEditors: linkaiyan
 * @Description:
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { google } from 'googleapis'
import pc from 'picocolors'
import vaildParams from '../vite/utils/vaildParams'

const argv = process.argv
const appPath = vaildParams(argv[argv.length - 1])
console.warn(pc.magentaBright(`[ 活动 ] => ${pc.cyan(appPath)}`))

const googleSpreadsheetsConfig: { sheetsName: string, spreadsheetId: string } = {
  sheetsName: 'dino-activity',
  spreadsheetId: '1tD3yKQ3UzkN_9m0HD89YcIdx0Jk9deCJKiHl7hecvNc',
}

async function setupGoogleSheetsClient() {
  const jwtClient = new google.auth.JWT({
    email: 'google-sheets@neon-operator-394716.iam.gserviceaccount.com',
    key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCWx84NPWwtB77s\n16/ZUvsHMdQdHuRnjJcdPsLPRs3OjBychkBW8iRmjqeYH5mbE4ftU/9+NcN2SBlJ\nUnwOV1bxiPPHsZ1SpIEUNykxMOYj8TztD+5NbUKDhDhmurQLEauCpbFvd2YHT1yP\n64ed/3hTtT19hBNBY19ZqFvciH6SZ3hK9O3tN0tD6h1Pmg7D/OzJFzy72qA6N17c\neGpfUjwVL5GwajjQEESiXHI2spTgScA6QUGDfDBSpaf0h3VerQ4IlIOA7sQ20xaE\ne65h0FFVy8KpOGk9rBnyvf61NA/LnExxvusc1cllokMQ6bDPgqYPP/kMPr5MWBl4\nhc+om3lBAgMBAAECggEADeheJDB/MuQdA0Gd0cDqsK4y74Cy9q4sHiF03KOeRif8\nV5+2fY6WNvN/l/OKOpihmA2AaobRAa8CzhWSpcv+lAba3ZePeFj+Ivw3i3cEM1qE\nESXACFpEoVbn0On1w3Ocy083P53WxmPWmNvTxYoT8jyscFBnakedOurhlkTsz9oh\nKk+VShTkOyqERJtWnrU9tanOZw1OPBl72sOgraw80T4qh0OLgZBLhFIQXKZL4zrh\nqpCaj6S+r98lWMFQwG/6cAKjLXgiQEOwQroOUZaw9pLtkaAuvrmg1RPp3quGAHrb\ndtC36ZH5Uu2uLiQXOaYJetQDiGQdg0nzOSI6fd8C9QKBgQDGmy8WYYJ6g5x+0TdA\nipGAtHWtNWb4xNjpn/A4P9EuEbSw2t3UrAlb/x5L40czLAUaXrU8qryl0BQZrueB\n8SEfxJu5JjNCyJegU/UbL1wpCq2mUm9CNy9hhY0aXm2vtTzmZzurg5puyiYFxpu6\nnY7O4BATCyRFvHUhQ7755TUU3wKBgQDCWn4Tx7/ly9Uzz6ui5jWp3zUEaiHzX4de\nfAkAuzmiLC2Z1sX+4SqQL9EoHdzFCGIVuZJS19iOKxUf/843iSCUyE83hpfGW6TC\n82cQvBZ1Ovy7zVTNzL/nnaYon45nXwyxeoSoUMcGjHOCyug5SXzKvUoju2lp5GVM\nWaTCiFgV3wKBgG7f9bKt7zTMQtK9o/XhJgfPNx7igEEDTAFpK6eLYREyC0jsdwki\nnfsA+v3svTQBMDwfgViEDNsYxg/siAwP/KkKjtEXVWjEKXn1RRHPJ8k1z+nZfYle\n25G7CCIfc2azbHNIUJSY3N9a9U0mKoxNJ4uwpOiswKw54L4YXwaNgkvLAoGAcOMC\n7BZPvffhBFERTnMMpHiDYOcMhUHtbNH6oLQey7WBXyPCqUK76Df98qE1xDQUVK4O\n8ZNxs1IO2SFJ9DPv+rtGV+gTbCF618ltCelV2g3DEoo3Qbo1lSCajGnw2tX4l3Wk\na+dPUtxtk4Cr1ep7U38S+yI2Hk2NEQXYjy2GjF0CgYB6UtKIh34ZtIRBYeCiryGT\n5H9502Ik/pybrmO7T6u4DmBdQCYoGgueP1yVqL829e0nOwMwniJo1/1Eswp7XpqD\nr0tTK+l0AoYE0NsBcswrbn7tchYoIlFBrSKBJVGDd7v0MrzPWrQ0osc7tf2zXq2A\ncUtzKpotRqFoO8ZpU9Siqg==\n-----END PRIVATE KEY-----\n',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  await jwtClient.authorize()
  return google.sheets({ version: 'v4', auth: jwtClient })
}

async function generateSheetFile() {
  const sheetsClient = await setupGoogleSheetsClient()

  const response = await sheetsClient.spreadsheets.values.get({
    spreadsheetId: googleSpreadsheetsConfig.spreadsheetId,
    range: `${googleSpreadsheetsConfig.sheetsName}!A1:AA999`,
  })

  const allLanguages = response.data.values?.[0] || []
  const allContents = response.data.values?.slice(1) || []

  const ctns = allContents.filter(item => item[0] === appPath)

  let targetLanguages: string[] | null = null
  const constantsPath = path.join(process.cwd(), appPath, 'constants.ts')

  if (fs.existsSync(constantsPath)) {
    try {
      const constantsModule = await import(`file://${constantsPath}`)
      const { languages } = constantsModule
      if (languages && Array.isArray(languages) && languages.length > 0) {
        targetLanguages = languages
      }
    }
    catch (error) {
      console.warn(pc.red('Failed to import constant.ts:'), error)
    }
  }

  console.warn(pc.magentaBright(`[ 语言 ] => ${pc.green(targetLanguages ? targetLanguages.join(', ') : 'all')}`))

  const localesDir = path.join(process.cwd(), appPath, 'locales')

  if (fs.existsSync(localesDir)) {
    fs.rmSync(localesDir, { recursive: true, force: true })
  }

  fs.mkdirSync(localesDir, { recursive: true })

  const languagesToGenerate = targetLanguages || allLanguages.slice(2)

  languagesToGenerate.forEach((langCode) => {
    const langIndex = targetLanguages
      ? allLanguages.findIndex(lang => lang === langCode)
      : allLanguages.indexOf(langCode) + 2

    if (langIndex === -1 || langIndex < 2) {
      console.warn(pc.red(`Language "${langCode}" not found in spreadsheet.`))
      return
    }

    const langData: Record<string, string> = {}

    ctns.forEach((row) => {
      const key = row[1]
      const value = row[langIndex]
      if (key && value !== undefined) {
        langData[key] = value
      }
    })

    const filePath = path.join(localesDir, `${langCode}.json`)
    fs.writeFileSync(filePath, JSON.stringify(langData, null, 2), 'utf-8')
    console.warn(pc.greenBright(`✓ 生成成功: ${pc.cyan(filePath)}`))
  })
}

generateSheetFile()
