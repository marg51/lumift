import UtoService from "../services/uto"
import AnyTrigger from "../services/uto/triggers/any"
import SlackMessageAction from "../services/slack/actions/new-message"
import PushNotificationAction from "../services/ios/actions/push-notification"

const applet: APPLET<UTO_WEBHOOK> = {
    id: "anyWebhookToSlack",
    name: "anyWebhookToSlack",
    service: UtoService,
    trigger: AnyTrigger,
    actions: [PushNotificationAction, SlackMessageAction],
    config: {
        [SlackMessageAction.id]: ({ ingredients }) => ({
            text: ingredients.message,
            channel: "G0YDU2X47",
            token: process.env.SLACK_TOKEN,
        }),
        [PushNotificationAction.id]: ({ ingredients }) => ({
            message: ingredients.message,
            token: process.env.IOS_PUSH_TOKEN,
        }),
    },
}

export default applet