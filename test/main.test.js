const test = require('ava')
const intervalHandler = require('../main')

test.serial('test interval start', async (t) => {
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

test.serial('test interval start now', async (t) => {
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

test.serial('test interval stop', (t) => {
    const ih = intervalHandler(0, Function)
    ih.start(true)
    ih.stop()
    t.true(ih.isStopped())
})
