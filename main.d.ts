export type IntervalHandler = {
    start: (already?: boolean) => void
    , stop: () => void
    , isStopped: () => boolean
}

declare function createIntervalHandler(every: number, fn: (...args: any[]) => any): IntervalHandler
export default createIntervalHandler
