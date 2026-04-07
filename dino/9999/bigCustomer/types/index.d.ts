/*
 * @Author: linkaiyan
 * @Date: 2025-10-29 17:21:25
 * @LastEditTime: 2026-04-07 14:27:01
 * @LastEditors: linkaiyan
 * @Description:
 */
interface PunchRecordRes {
  data: {
    punchIntegral: number
    punchRecord: string[]
  }
  time: number
}

interface GiftInfoList {
  configId: number
  giftId: number
  giftName: string
  icon: string
  worth: number
  isReturn: boolean
  voteNum: number
  voteNumPercentage: number
  selected?: boolean
  selectNum?: number
}

interface VoteInfoRes {
  giftInfoList: GiftInfoList[]
  voteState: 1 | 2
}

interface ExpGift {
  id: number
  giftId: number
  giftType: 1 | 2 | 3 | 4 | 5 | 6
  giftName: string
  giftIcon: string
  worth: number
  buyCount: number
}

enum UnitType {
  FOREVER = -1,
  HOURS = 1,
  DAY = 2,
}

interface PunchReward {
  rewardType: number
  rewardId: number
  rewardIcon: string
  rewardName: string
  amount: number
  singleEffectiveTime: number
  worth: number
  unit: UnitType
  requestDays: number
  receiveState: number
}

interface PunchAwardRes {
  punchCount: number
  punchRewardList: PunchReward[]
}

interface PunchRes {
  punchNum: number
  giveEntities: GiveEntity[]
  punchIntegral: number
}

interface BuyRecord {
  rewardName: string
  needIntegral: string
  createTime: string
  time?: string
}

interface BuyRecordRes {
  records: BuyRecord[]
  total: number
  size: number
  current: number
}

interface ExchangeGift {
  id: number
  tagType: number
  type: number
  productId: number
  productName: string
  worth: number
  icon: string
  amount: number
  sort: number
  status: number
  unit: UnitType
  rewardNum: number
  singleEffectiveTime: number
  isLimitExchange: boolean
  limitType: 1 | 2 | 3
  remainder: number
}

interface ExchangeListRes {
  ornamentSessionList: ExchangeGift[]
  propSessionList: ExchangeGift[]
  choiceSessionList: ExchangeGift[]
}

interface RewardLog {
  id: number
  userId: string
  rewardName: string
  rewardIcon: string
  businessId: string
  source: number
  rewardType: number
  worth: number
  rewardNum: number
  count: number
  unit: UnitType
  createDate: string
  createTime: string
  singleEffectiveTime: number
  type: number
  activityName: string
}

interface ExchangeRecord {
  rewardLog: RewardLog
  costPoint: number
  time?: string
}

interface Order {
  column: string
  asc: boolean
}

interface ExchangeRecordRes {
  records: ExchangeRecord[]
  total: number
}

enum State {
  DISABLED = 1, // 不可领取
  ENABLE = 2, // 可领取
  RECEIVED = 3, // 已领取
}

enum UserType {
  NORMAL = 1,
  BIGCUSTOMER = 2,
  PASTBIGCUSTOMER = 3,
}

interface UserInfoRes {
  avatarUrl: string
  nickname: string
  userType: UserType
  userLevel: number
  customerRewardList: GiveEntity[]
  currentPoint: number
  rewardReceivedState: State
  needRecDiamondAmount: number
  rewardCountdown: number
}

interface VoteListItem {
  id: number
  amount: number
}
interface VoteListParams {
  paramIdDtoList: VoteListItem[]
}
