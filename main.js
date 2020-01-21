const handlerInterval = (fn, time) => {
    const interval = setInterval(fn, time)
    return () => clearInterval(interval)
}

const start = (intervalsRepo, stopables) => (id, now = false) => {
    const handler = intervalsRepo.get(id)
    if (handler) {
        const fn = handlerInterval(handler.fn, handler.every)
        stopables.set(id, {
            fn
            , stopped: false
        })

        if (now) handler.fn()
    }
}

const stop = (stopables) => (id) => {
    const handler = stopables.get(id)
    if (handler) {
        const stopRunning = stopables.get(id)
        stopRunning.stopped = true
        stopRunning.fn()
    }
}

const add = (intervalsRepo) => ({ id, every, fn }) => {
    intervalsRepo.set(id, {
        fn
        , every
    })
}

const remove = (intervalsRepo, stopables) => (id) => {
    intervalsRepo.delete(id)
    const stopRunning = stopables.get(id)
    if (stopRunning) {
        stopRunning()
        stopables.delete(id)
        return
    }

    stopables.delete(id)
}

const isStopped = (stopables) => (id) => {
    const stopb = stopables.get(id)
    return stopb.stopped
}

const createIntervalHandler = () => {
    const intervals = new Map()
    const stopables = new Map()

    return {
        start: start(intervals, stopables)
        , stop: stop(stopables)
        , add: add(intervals)
        , remove: remove(intervals, stopables)
        , isStopped: isStopped(stopables)
    }
}

module.exports = createIntervalHandler