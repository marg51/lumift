const { get } = require("lodash")
const logger = require("../../../utils/log").createLogger("slack/actions/rtm")

const slack = require("../utils/slack")

import SlackService from "../index"
import parseParam from "../../../utils/parseParams"


const slackAnyAction: ACTION<any> = {
    id: "notifications:slack-message",
    name: "use random slack API",
    service: SlackService,
    exec(applet, ingredients, config, context) {
        const { action, payload } = parseParam(config, { applet, ingredients, config, context })
        const method = get(slack, action)
        if (!method)
            return logger.error(action, "doesn't exist")

        method(payload, (err) => {
            if (err)
                return logger.error(payload, err.message)
        })
    },
}
export default slackAnyAction
