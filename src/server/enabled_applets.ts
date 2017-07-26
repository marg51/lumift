import { buttons, response } from "../applets/swearing"

export const applets: APPLET[] = [
    require("../applets/emojiReply").default,
    require("../applets/ping").default,
    require("../applets/emojiReplySomeoneElse").default,
    require("../applets/anyWebhookToSlack").default,
    require("../applets/slackUserList").default,
    buttons,
    response
]