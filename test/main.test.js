const test = require('ava')
const intervalHandler = require('../main')

test.serial('interval start', async (t) => {
    let ih = null
    let count = 0

    const run = (call) => new Promise((resolve) => {
        ih = intervalHandler(1000, call)
        ih.start()
        setTimeout(resolve, 3000)
    })

    await run(() => count++)
    ih.stop()
    t.is(count, 2)
})

test.serial('interval start now', async (t) => {
    let ih = null
    let count = 0

    const run = (call) => new Promise((resolve) => {
        ih = intervalHandler(1000, call)
        ih.start(true)
        setTimeout(resolve, 3000)
    })

    await run(() => count++)
    ih.stop()
    t.is(count, 3)
})

test.serial('interval stop', (t) => {
    const ih = intervalHandler(0, Function)
    ih.start(true)
    ih.stop()
    t.true(ih.isStopped())
})


test.serial('intovke stop before start interval', (t) => {
    const ih = intervalHandler(0, Function)
    const err = t.throws(ih.stop)
    t.is(err.name, 'intovke stop before start interval')
    t.is(err.message, 'the stop function was called before calling the start function')
})
