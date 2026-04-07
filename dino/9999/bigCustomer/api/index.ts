/*
 * @Author: linkaiyan
 * @Date: 2025-10-29 17:02:49
 * @LastEditTime: 2026-04-07 11:47:19
 * @LastEditors: linkaiyan
 * @Description:
 */
import { http } from '@/http'

enum Api {
  PUNCH_RECORD = '/api/activity/major/customers/listPunchRecord',
  PUNCH_AWARD = `/api/activity/major/customers/listPunchReward`,
  PUNCH = `/api/activity/major/customers/punchRecord`,

  VOTE_INFO = '/api/activity/major/customers/gift/vote/info',
  VOTE_NUM = '/api/activity/major/customers/gift/vote/num',
  VOTE = `/api/activity/major/customers/gift/vote/operate`,

  EXP_LIST = `/api/activity/major/customers/listExperienceGift`,

  BUY_RECORD = `/api/activity/major/customers/buyRecord`,

  EXCHANGE_LIST = `/api/activity/major/customers/exchange/config/list`,
  EXCHANGE_RECORD = `/api/activity/major/customers/exchange/record`,
  EXCHANGE = `/api/activity/major/customers/exchange`,

  BUY = `/api/activity/major/customers/receivePunchReward`,
  USER_INFO = `/api/activity/major/customers/user/customer/info`,

  RECEIVE_AWARD = `/api/activity/major/customers/user/customer/reward`,

}

// 打卡记录查询
function listPunchRecord() {
  return http.get<PunchRecordRes>(Api.PUNCH_RECORD, { rawResponse: true })
}
// 获取打卡指定天数奖励列表
function listPunchAward() {
  return http.get<PunchAwardRes>(Api.PUNCH_AWARD)
}
// 进行打卡
function punch() {
  return http.post<PunchRes>(Api.PUNCH)
}
// 礼物投票信息查询
function listVoteInfo(params: { periodType: 1 | 2 }) {
  return http.get<VoteInfoRes>(Api.VOTE_INFO, { params })
}

// 剩余投票票数
function getVoteNum() {
  return http.get<number>(Api.VOTE_NUM)
}

// 投票
function vote(params: VoteListParams) {
  return http.post(Api.VOTE, params)
}

// 获取抢先体验礼物列表
function listExpGift() {
  return http.get<ExpGift[]>(Api.EXP_LIST)
}

// 购买记录
function listBuyRecord(params: { current: number, size: number }) {
  return http.get<BuyRecordRes>(Api.BUY_RECORD, { params })
}

// 查询兑换列表
function listExchange() {
  return http.get<ExchangeListRes>(Api.EXCHANGE_LIST)
}

// 兑换记录
function listExchangeRecord(params: { current: number, size: number }) {
  return http.get<ExchangeRecordRes>(Api.EXCHANGE_RECORD, { params })
}
// 兑换
function exchange(params: { id: number, amount: number }) {
  return http.post<ExchangeRecordRes>(Api.EXCHANGE, params)
}

// 购买礼物
function buyGift(params: { giftId: number, giftType: number }) {
  return http.post<ExchangeRecordRes>(Api.BUY, params)
}

// 用户身份信息
function getCustomerInfo() {
  return http.get<UserInfoRes>(Api.USER_INFO)
}

// 大客户专属奖励
function receoveCustomerAward() {
  return http.post(Api.RECEIVE_AWARD)
}

export {
  buyGift,
  exchange,
  getCustomerInfo,
  getVoteNum,
  listBuyRecord,
  listExchange,
  listExchangeRecord,
  listExpGift,
  listPunchAward,
  listPunchRecord,
  listVoteInfo,
  punch,
  receoveCustomerAward,
  vote,
}
