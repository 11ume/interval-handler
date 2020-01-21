const createError = (name, msg) => {
    const err = new Error(msg)
    err.name = name
    return err
}

const isFunction = (pram, name) => {
    if (!(pram instanceof Function)) {
        throw createError('Param is not a function', `Param ${name} must be function`)
    }
}

const isNumber = (pram, name) => {
    if (!(typeof pram === 'number')) {
        throw createError('Param is not a number', `Param ${name} must be number`)
    }
}

const isRequired = (name) => {
    throw createError('Param is required', `Param ${name} is required`)
}

module.exports = {
    isFunction
    , isNumber
    , isRequired
    , createError
}