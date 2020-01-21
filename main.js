const { isRequired, isFunction, isNumber } = require('./utils')

const handlerInterval = (fn, time) => {
    const interval = setInterval(fn, time)
    return () => clearInterval(interval)
}

const start = (controller, every, fn) => (now = false) => {
    controller.handler = handlerInterval(fn, every)
    controller.running = true
    if (now) fn()
}

const stop = (controller) => () => {
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