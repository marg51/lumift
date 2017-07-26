import SlackService from "../services/slack"
import AnyRtmTrigger from "../services/slack/triggers/rtm"
import SlackMessageAction from "../services/slack/actions/new-message"
import UtoActions from "../services/uto/actions/termlog"

import match, { matchWords, matchWord } from "../utils/match"

export const buttons: APPLET<SLACK_MESSAGE> = {
    id: "applet-swearing-1",
    name: "applet-swearing-1",
    service: SlackService,
    trigger: AnyRtmTrigger,
    actions: [SlackMessageAction],
    stream_config: {
        token: process.env.SLACK_BOT_TOKEN
    },
    config: {
        [AnyRtmTrigger.id]: {
            type: "message",
            text: /U5DTPL59V.*swear/,
            user: "U04QB0FJZ"
        },
        [SlackMessageAction.id]: ({ ingredients }): SLACK_MESSAGE => ({
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
        }),
    },
}

import AnyWebhookTrigger from "../services/slack/triggers/any"

export const response: APPLET<SLACK_WEBHOOK> = {
    id: "applet-swearing-1",
    name: "applet-swearing-1",
    service: SlackService,
    trigger: AnyWebhookTrigger,
    actions: [UtoActions, SlackMessageAction],
    config: {
        [AnyWebhookTrigger.id]: {
            callback_id: "swear"
        },
        [UtoActions.id]: ({ ingredients }) => ingredients,
        [SlackMessageAction.id]: ({ ingredients }): SLACK_MESSAGE => ({
            channel: ingredients.channel.id,
            token: process.env.SLACK_TOKEN,
            text: "<@" + ingredients.actions[0].value + ">: t'es un noob"
        })
    }
}
