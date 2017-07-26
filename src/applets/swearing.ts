import AnyRtmTrigger from "../services/slack/triggers/rtm"
import SlackMessageAction from "../services/slack/actions/new-message"
import UtoActions from "../services/uto/actions/termlog"

import Applet from "../utils/applet"
import match, { matchWords, matchWord } from "../utils/match"

const buttonsPartial = new Applet<SLACK_MESSAGE>("swear", {
    stream_config: {
        token: process.env.SLACK_BOT_TOKEN
    }
})

buttonsPartial.addTrigger(AnyRtmTrigger, {
    type: "message",
    text: /U5DTPL59V.*swear/,
    user: "U04QB0FJZ"
})

buttonsPartial.addAction(SlackMessageAction, ({ ingredients }): SLACK_MESSAGE => ({
    text: "Qui veux-tu insulter?",
    channel: ingredients.channel,
    attachments: [
        {
            "text": "Choisis un noob",
            "fallback": "Désolé, tu peux pas",
            "callback_id": "swear",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "swear",
                    "text": "Buzz",
                    "type": "button",
                    "value": "U63MJF9EE"
                },
                {
                    "name": "swear",
                    "text": "Fabien",
                    "type": "button",
                    "value": "U0L2ARSE7"
                }, {
                    "name": "swear",
                    "text": "Fabien",
                    "style": "danger",
                    "type": "button",
                    "value": "U0L2ARSE7"
                }
            ]
        }
    ],
    token: process.env.SLACK_TOKEN,
}))

import AnyWebhookTrigger from "../services/slack/triggers/any"


const responsePartial = new Applet<SLACK_WEBHOOK>("swear-response", {})

responsePartial.addTrigger(AnyWebhookTrigger, {
    callback_id: "swear"
})

responsePartial.addAction(UtoActions, ({ ingredients }) => ingredients)
responsePartial.addAction(SlackMessageAction, ({ ingredients }): SLACK_MESSAGE => ({
    channel: ingredients.channel.id,
    token: process.env.SLACK_TOKEN,
    text: "<@" + ingredients.actions[0].value + ">: t'es un noob"
}))


export const buttons = buttonsPartial.getApplet()
export const response = responsePartial.getApplet()
