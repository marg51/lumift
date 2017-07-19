const logger = require("../../../utils/log").createLogger("slack/new-message")

import SlackService from "../index"

const sendMessage = require("../utils/send-message")

import parseParam from "../../../utils/parseParams"

const newMessageAction: ACTION = {
    id: "notifications:slack-message",
    service: SlackService,
    name: "Send Slack message",
    exec(applet, ingredients, config, context) {
        const { channel, token } = config

        sendMessage(
            parseParam(config, { applet, ingredients, config, context }),
            () => { }
        )
    },
}

export default newMessageAction
