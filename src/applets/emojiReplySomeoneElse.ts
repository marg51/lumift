import SlackService from "../services/slack"
import AnyTrigger from "../services/slack/triggers/rtm"
import SlackAnyAction from "../services/slack/actions/any"
import UtoLog from "../services/uto/actions/termlog"

import match from "../utils/match"


const waver: APPLET = {
    id: "applet-waver-someone-else",
    name: "emoji-reply-someone-else",
    service: SlackService,
    trigger: AnyTrigger,
    actions: [UtoLog, SlackAnyAction],
    stream_config: {
        token: process.env.SLACK_BOT_TOKEN
    },
    config: {
        scheduler: {
            getKey(ingredients) {
                return ingredients.text
            },
            hold: {
                when(ingredients) {
                    return match(ingredients, {
                        text: /<@U5DTPL59V> react :[^\ ]*: to <@[^>]*>/
                    })
                },
                map(ingredients) {
                    return {
                        user: ingredients.text.match(/to <@([^>]*)>/)[1],
                        emoji: ingredients.text.match(/react :(.*): /)[1]
                    }
                },
                until({ ingredients, context }) {
                    return match(ingredients, {
                        type: "message",
                        user: context.hold.user
                    })
                }
            }
        },
        [AnyTrigger.id]: {
            type: "message"
        },
        [SlackAnyAction.id]: {
            action: "reactions.add",
            token: process.env.SLACK_BOT_TOKEN,
            payload: ({ ingredients, context }: any) => ({
                name: context.hold.emoji,
                channel: ingredients.channel,
                timestamp: ingredients.ts
            })
        },
    },
}

export default waver
