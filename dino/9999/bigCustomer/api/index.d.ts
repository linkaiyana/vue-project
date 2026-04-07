export enum UserType {
  NORMAL = 1,
  BIGCUSTOMER = 2,
  PASTBIGCUSTOMER = 3,
}

export enum State {
  DISABLED = 1, // 不可领取
  ENABLE = 2, // 可领取
  RECEIVED = 3, // 已领取
}
