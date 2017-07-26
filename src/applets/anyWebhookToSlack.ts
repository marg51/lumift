import AnyTrigger from "../services/uto/triggers/any"
import SlackMessageAction from "../services/slack/actions/new-message"
import PushNotificationAction from "../services/ios/actions/push-notification"

import Applet from "../utils/applet"

const applet = new Applet<UTO_WEBHOOK>("any webhook", {})

applet.addTrigger(AnyTrigger, {})

applet.addAction(PushNotificationAction, ({ ingredients }) => ({
    message: ingredients.message,
    token: process.env.IOS_PUSH_TOKEN,
}))

applet.addAction(SlackMessageAction, ({ ingredients }) => ({
    text: ingredients.message,
    channel: "G0YDU2X47",
    token: process.env.SLACK_TOKEN,
}))

export default applet.getApplet()