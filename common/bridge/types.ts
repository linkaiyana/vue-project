export type Platform = 'android' | 'ios' | 'default'

export type BridgeFunction<TArgs extends unknown[] = []> = (...args: TArgs) => void
export type AndroidArgsMapper<TArgs extends unknown[]> = (...args: TArgs) => unknown[]
export type IOSPayloadMapper<TArgs extends unknown[]> = (...args: TArgs) => unknown
export type BridgeValidateResult = boolean | string
export type BridgeValidator<TArgs extends unknown[]> = (...args: TArgs) => BridgeValidateResult

export interface AndroidBridgeConfig<TArgs extends unknown[]> {
  method: string
  args?: AndroidArgsMapper<TArgs>
}

export interface IOSBridgeConfig<TArgs extends unknown[]> {
  handler: string
  payload?: IOSPayloadMapper<TArgs>
}

export interface BridgeDefinition<TArgs extends unknown[] = []> {
  android?: AndroidBridgeConfig<TArgs>
  ios?: IOSBridgeConfig<TArgs>
  validate?: BridgeValidator<TArgs>
}

export type BridgeDefinitionMap = Record<string, BridgeDefinition<any>>
export type BridgeActionMap<TDefinitions extends BridgeDefinitionMap> = {
  [K in keyof TDefinitions]: TDefinitions[K] extends BridgeDefinition<infer TArgs> ? BridgeFunction<TArgs> : never
}
