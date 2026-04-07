import type { BridgeActionMap, BridgeDefinition, BridgeDefinitionMap, BridgeValidateResult, Platform } from './types'

function warnUnsupported(name: string, platform: Platform, methodName?: string) {
  if (platform === 'default') {
    console.warn(`[jsBridge] ${name} is not supported on current platform`)
    return
  }

  if (methodName) {
    console.warn(`[jsBridge] ${name} failed: ${platform} bridge method "${methodName}" is unavailable`)
    return
  }

  console.warn(`[jsBridge] ${name} is not configured for ${platform}`)
}

function warnInvalidArgs(name: string, result: BridgeValidateResult) {
  if (typeof result === 'string') {
    console.warn(`[jsBridge] ${name} failed: ${result}`)
    return
  }

  console.warn(`[jsBridge] ${name} failed: invalid arguments`)
}

function callAndroid(name: string, method: string, args: unknown[] = []) {
  const target = window.Android?.[method]
  if (typeof target !== 'function') {
    warnUnsupported(name, 'android', method)
    return
  }
  target(...args)
}

function callIOS(name: string, handler: string, payload?: unknown) {
  const target = window.webkit?.messageHandlers?.[handler]
  if (typeof target?.postMessage !== 'function') {
    warnUnsupported(name, 'ios', handler)
    return
  }
  target.postMessage(payload)
}

export function defineBridge<TArgs extends unknown[] = []>(definition: BridgeDefinition<TArgs>) {
  return definition
}

export function createBridgeActions<TDefinitions extends BridgeDefinitionMap>(
  platform: Platform,
  definitions: TDefinitions,
): BridgeActionMap<TDefinitions> {
  const actions = Object.fromEntries(
    Object.entries(definitions).map(([name, definition]) => {
      const action = (...args: unknown[]) => {
        const validateResult = definition.validate?.(...args)
        if (validateResult === false || typeof validateResult === 'string') {
          warnInvalidArgs(name, validateResult)
          return
        }

        if (platform === 'android') {
          if (!definition.android) {
            warnUnsupported(name, platform)
            return
          }

          const androidArgs = definition.android.args ? definition.android.args(...args) : args
          return callAndroid(name, definition.android.method, androidArgs)
        }

        if (platform === 'ios') {
          if (!definition.ios) {
            warnUnsupported(name, platform)
            return
          }

          const payload = definition.ios.payload ? definition.ios.payload(...args) : args[0]
          return callIOS(name, definition.ios.handler, payload)
        }

        warnUnsupported(name, platform)
      }

      return [name, action]
    }),
  )

  return actions as BridgeActionMap<TDefinitions>
}
