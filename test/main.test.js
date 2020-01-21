const test = require('ava')
const intervalHandler = require('../main')

test('test interval start', async (t) => {
    const id = Symbol()
    const ia = intervalHandler()

    const run = (call) => new Promise((resolve) => {
        ia.add({
            id
            , every: 1000
            , fn: call
        })

        ia.start(id)
        setTimeout(resolve, 3000)
    })

    let count = 0
    await run(() => {
        count++
    })

    ia.stop(id)
    t.is(count, 2)
})

test('test interval stop', async (t) => {
    const id = Symbol()
    const ia = intervalHandler()

    const run = () => new Promise((resolve) => {
        ia.add({
            id
            , every: 1000
            , fn: resolve
        })

        ia.start(id)
    })

    await run(() => ia.stop(id))
    t.true(ia.getStatus(id).stopped)
})