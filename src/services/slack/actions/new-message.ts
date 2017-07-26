const logger = require("../../../utils/log").createLogger("slack/new-message")

import SlackService from "../index"

const sendMessage = require("../utils/send-message")

import parseParam from "../../../utils/parseParams"

const newMessageAction: ACTION<SLACK_MESSAGE> = {
    id: "notifications:slack-message",
    service: SlackService,
    name: "Send Slack message",
    exec({ payload }) {

        sendMessage(
            payload,
            () => { }
        )
    },
}

export default newMessageAction
