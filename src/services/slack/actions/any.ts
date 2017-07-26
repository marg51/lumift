const { get } = require("lodash")
const logger = require("../../../utils/log").createLogger("slack/actions/rtm")

const slack = require("../utils/slack")

import SlackService from "../index"
import parseParam from "../../../utils/parseParams"

type SLACK_ANY_ACTION = SLACK_ACTION_REACTIONSADD

const slackAnyAction: ACTION<SLACK_ANY_ACTION> = {
    id: "notifications:slack-message",
    name: "use random slack API",
    service: SlackService,
    exec({ payload }) {
        let { action } = payload
        const method = get(slack, action)
        if (!method)
            return logger.error(action, "doesn't exist")

        method(payload.payload, (err) => {
            if (err)
                return logger.error(payload.payload, err.message)
        })
    },
}
export default slackAnyAction
