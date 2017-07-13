const { get } = require("lodash")
const logger = require("../../../utils/log").createLogger("slack/actions/rtm")

const slack = require("../utils/slack")

import SlackService from "../index"


const slackAnyAction: ACTION = {
    id: "notifications:slack-message",
    name: "use random slack API",
    service: SlackService,
    exec(applet: APPLET, ingredients: any, config: APPLET_CONFIG, context?: any) {
        const { action, payload, token } = config
        const method = get(slack, action)
        if (!method)
            return logger.error(action, "doesn't exist")

        const params = { token, ...parseParam(payload, { applet, ingredients, config, context }) }
        method(params, (err) => {
            if (err)
                return logger.error(params, err.message)
        })
    },
}
export default slackAnyAction

function parseParam(value, { applet, ingredients, config, context }) {
    if (typeof value == "function") {
        return value({ applet, ingredients, config, context })
    }

    return value
}
