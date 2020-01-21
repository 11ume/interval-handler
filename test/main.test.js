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

test('test interval start now', async (t) => {
    const id = Symbol()
    const ia = intervalHandler()

    const run = (call) => new Promise((resolve) => {
        ia.add({
            id
            , every: 1000
            , fn: call
        })

        ia.start(id, true)
        setTimeout(resolve, 3000)
    })

    let count = 0
    await run(() => {
        count++
    })

    ia.stop(id)
    t.is(count, 3)
})

test('test interval stop', async (t) => {
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
        ia.stop(id)
    })


    t.is(count, 1)
    t.true(ia.isStopped(id))
})
