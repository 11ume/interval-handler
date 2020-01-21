type AddArgs = {
    id: symbol
    , every: number
    , fn: (...args: any[]) => any
}

export type IntervalHandler = {
    start: (id: string) => void
    , stop: (id: string) => void
    , add: (args: AddArgs) => void
    , remove: (id: symbol) => void
    , isStopped: () => boolean
}

declare function createIntervalHandler(): IntervalHandler
export default createIntervalHandler
