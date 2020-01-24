const { isRequired, isFunction, isNumber, createError } = require('./utils')

const handlerInterval = (fn, time) => {
    const interval = setInterval(fn, time)
    return () => clearInterval(interval)
}

const start = (controller, every, fn) => (already = false) => {
    controller.handler = handlerInterval(fn, every)
    controller.running = true
    if (already) fn()
}

const stop = (controller) => () => {
    if (!controller.handler) {
        throw createError('intovke stop before start interval', 'the stop function was called before calling the start function')
    }

    controller.handler()
    controller.running = false
}

const isStopped = (controller) => () => {
    return !controller.running
}

const createIntervalHandler = (every = isRequired('every'), fn = isRequired('fn')) => {
    const controller = {
        handler: null
        , running: false
    }

    isNumber(every, 'every')
    isFunction(fn, 'fn')

    return {
        start: start(controller, every, fn)
        , stop: stop(controller)
        , isStopped: isStopped(controller)
    }
}

module.exports = createIntervalHandler