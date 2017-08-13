import AnyTrigger from "../services/slack/triggers/rtm"
import AnyWebhookTrigger from "../services/uto/triggers/any"
import SlackMessageAction from "../services/slack/actions/new-message"

import match, { matchWords, matchWord } from "../utils/match"

import Applet from "../utils/applet"

const applet = new Applet<SLACK_MESSAGE>("ping", {
    stream_config: {
        token: process.env.SLACK_BOT_TOKEN
    }
})

applet.addTrigger(AnyTrigger, {
    type: "message",
    text: { $in: matchWords(["ping", "pong"]) },
    user: {
        $exclude: "U5DTPL59V"
    }
})

applet.addAction(SlackMessageAction, ({ ingredients }) => ({
    text: ingredients.text.match(matchWord("ping")) ? "pong" : "ping",
    channel: ingredients.channel,
    token: process.env.SLACK_TOKEN
}))

export default applet.getApplet()
