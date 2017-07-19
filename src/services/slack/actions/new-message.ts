const logger = require("../../../utils/log").createLogger("slack/new-message")

const createTemplate = require("lodash").template
const sendMessage = require("../utils/send-message")

const token = process.env.SLACK_TOKEN
const template = "a new issue #<%=number%> has been opened"
const channel = "G0YDU2X47"

import parseParam from "../../../utils/parseParams"

module.exports = {
    id: "notifications:slack-message",
    requires: [],
    isValid: () => true,
    hooks: {
        pre() { },
        post() { },
    },
    exec(applet, ingredients, config, context) {
        const { channel, token } = config

        sendMessage(
            parseParam(config, { applet, ingredients, config, context }),
            () => { }
        )
    },
}
