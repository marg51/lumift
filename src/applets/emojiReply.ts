import SlackService from "../services/slack"
import AnyTrigger from "../services/slack/triggers/rtm"
import SlackAnyAction from "../services/slack/actions/any"
import UtoLog from "../services/uto/actions/termlog"
import match from "../utils/match"


const waver: APPLET = {
    id: "applet-waver",
    name: "add wave reaction to messages",
    service: SlackService,
    trigger: AnyTrigger,
    actions: [UtoLog, SlackAnyAction],
    stream_config: {
        token: process.env.SLACK_BOT_TOKEN
    },
    config: {
        scheduler: {
            activate: {
                when(ingredients) {
                    return match(ingredients, {
                        text: /<@U5DTPL59V> activate emoji/
                    })
                },
                until({ ingredients }) {
                    return match(ingredients, {
                        text: /<@U5DTPL59V> deactivate emoji/
                    })
                }
            }
        },
        [AnyTrigger.id]: {
            text: /^<@U5DTPL59V> :.*:$/,
            user: {
                $exclude: "U5DTPL59V"
            }
        },
        [SlackAnyAction.id]: {
            action: "reactions.add",
            token: process.env.SLACK_BOT_TOKEN,
            payload: ({ ingredients }: any) => ({
                name: ingredients.text.replace(/^<@U5DTPL59V> :(.*):$/, "$1"),
                channel: ingredients.channel,
                timestamp: ingredients.ts
            })
        },
    },
}

export default waver
