const logger = require("../utils/log").createLogger("scheduler")

const { debounce, throttle } = require("lodash")

declare var Map: any

const map = new Map()

export default (applet: APPLET, config: SCHEDULER_CONFIG = {}, data: any, callback: (data: any, context: any) => void): void => {
    if (!map.has(applet))
        map.set(applet, [])

    if (config.debounce)
        return setDebounce(applet, config, data, callback)

    if (config.buffer)
        return setBuffer(applet, config, data, callback)

    if (config.hold)
        return hold(applet, config, data, callback)


    if (config.throttle)
        return setThrottle(applet, config, data, callback)

    if (config.waitCalls)
        return waitCalls(applet, config, data, callback)

    callback(data, null)
}

function setDebounce(applet, config, data, callback) {
    const key = _getKey(applet, config, data, callback)

    const mapped = map.get(applet)

    if (!mapped[key])
        mapped[key] = debounce(callback, config.debounce)

    mapped[key](data)
}

function setThrottle(applet, config, data, callback) {
    const key = _getKey(applet, config, data, callback)

    const mapped = map.get(applet)

    if (!mapped[key])
        mapped[key] = throttle(callback, config.throttle)

    mapped[key](data)
}

function setBuffer(applet, config, data, callback) {
    const key = _getKey(applet, config, data, callback)

    const mapped = map.get(applet)

    if (!mapped[key])
        mapped[key] = []

    if (config.buffer.map) {
        const new_data = config.buffer.map(data, { context: { buffer: mapped[key] } })
        if (new_data)
            mapped[key].push(new_data)
    } else {
        mapped[key].push(data)
    }

    if (config.buffer.until({ ingredients: data, context: { buffer: mapped[key] } }, mapped[key])) {
        callback(data, { buffer: mapped[key] })
        mapped[key] = []
    } else if (config.buffer.shouldRunActions) {
        if (config.buffer.shouldRunActions({ ingredients: data, context: { buffer: mapped[key] } }))
            callback(data, { buffer: mapped[key] })
    }

    if (mapped[key].length > 100) {
        mapped[key] = 0
        logger.error("released buffer", key)
    }
}

function waitCalls(applet, config, data, callback) {
    const key = _getKey(applet, config, data, callback)

    const mapped = map.get(applet)

    if (!mapped[key])
        mapped[key] = 1

    const count = mapped[key]
    mapped[key] = count + 1

    if (config.waitCalls <= count) {
        mapped[key] = 0
        callback(data)
    }
}

function hold(applet: APPLET, config: SCHEDULER_CONFIG, data, callback) {
    const key = _getKey(applet, config, data, callback)


    const mapped = map.get(applet)

    if (config.hold.when(data) && !mapped[key]) {
        logger.log("registering")
        if (config.hold.map) {
            const new_data = config.hold.map(data)
            if (new_data)
                mapped[key] = new_data
        } else {
            mapped[key] = data
        }
    }
    if (mapped[key]) {
        if (config.hold.until({ ingredients: data, context: { hold: mapped[key] } })) {
            callback(data, { hold: mapped[key] })
            delete mapped[key]
        }
    }
}

function _getKey(applet, config, data, callback) {
    if (config.getKey)
        return config.getKey(data)

    return applet
}