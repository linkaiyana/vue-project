/*
 * @Author: linkaiyan
 * @Date: 2025-10-17 10:59:24
 * @LastEditTime: 2026-04-02 10:26:16
 * @LastEditors: linkaiyan
 * @Description:
 */

interface Params {
  current: number
  size: number
  [key: string]: any
}

// 定义 API 函数的类型
type ApiFunction<U = any, P = BasicApiParams> = (params: P) => Promise<{
  total?: number
  [key: string]: any
} & U>

// 定义格式化函数的类型
type FormatListFunction<U = any> = (res: U, current: number) => void

function useList<T, U>() {
  interface getListParams<P = BasicApiParams> {
    api: ApiFunction<U, P>
    args?: Partial<P>
    name: string
    formatList?: FormatListFunction<U>
    useFlag?: boolean // 没返回total，使用hasNext
  }

  const pageMsg = reactive({
    current: 1,
    size: 10,
    finished: false,
    loading: false,
    total: 0,
  })

  const list = ref<T[]>([])

  const reset = () => {
    pageMsg.current = 1
    pageMsg.finished = false
    pageMsg.loading = false
  }

  const getList = async <P = Params>(param: getListParams<P>) => {
    if (pageMsg.finished) return

    const { current, size } = pageMsg

    const { api, args = {} as P, name, formatList, useFlag = false } = param

    const params = {
      current,
      size,
      ...args,
    } as P

    try {
      const res = await api(params)

      if (formatList) {
        formatList(res, current)
      }
      const newList = res?.[name] || []

      if (current === 1) {
        pageMsg.total = res.total || 0
        list.value = [...newList]
      }
      else {
        list.value.push(...newList)
      }

      if (useFlag) {
        if (!res.hasNext) {
          pageMsg.finished = true
        }
        else {
          pageMsg.current++
        }
      }
      else {
        if (list.value.length >= pageMsg.total) {
          pageMsg.finished = true
        }
        // 可能会有脏数据，导致实际条数小于total
        else if (newList.length === 0) {
          pageMsg.finished = true
        }
        else {
          pageMsg.current++
        }
      }

      pageMsg.loading = false
    }
    catch (err) {
      pageMsg.loading = false
      console.warn(err)
    }
  }

  return {
    pageMsg,
    list,
    reset,
    getList,
  }
}

export default useList
