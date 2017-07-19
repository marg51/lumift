import SlackService from "../services/slack"
import AnyTrigger from "../services/slack/triggers/rtm"
const SlackMessageAction = require("../services/slack/actions/new-message")

import match, { matchWords, matchWord } from "../utils/match"


const waver: APPLET = {
    id: "applet-pingpong",
    name: "ping pong",
    service: SlackService,
    trigger: AnyTrigger,
    actions: [SlackMessageAction],
    stream_config: {
        token: process.env.SLACK_BOT_TOKEN
    },
    config: {
        scheduler: {
            throttle: 1000
        },
        [AnyTrigger.id]: {
            type: "message",
            text: { $in: matchWords(["ping", "pong"]) },
            user: {
                $exclude: "U5DTPL59V"
            }
        },
        [SlackMessageAction.id]: ({ ingredients }: CONTEXT) => ({
            text: ingredients.text.match(matchWord("ping")) ? "pong" : "ping",
            channel: ingredients.channel,
            token: process.env.SLACK_TOKEN,
        }),
    },
}

export default waver
