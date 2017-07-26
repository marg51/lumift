import AnyTrigger from "../services/slack/triggers/rtm"
import SlackAnyAction from "../services/slack/actions/any"

import Applet from "../utils/applet"

const applet = new Applet<SLACK_MESSAGE>("emojiReply", {
    stream_config: {
        token: process.env.SLACK_BOT_TOKEN
    }
})

applet.addTrigger(AnyTrigger, {
    text: /^<@U5DTPL59V> :.*:/,
    user: {
        $exclude: "U5DTPL59V"
    }
})

applet.addAction(SlackAnyAction, ({ ingredients }): SLACK_ACTION_REACTIONSADD => ({
    action: "reactions.add",
    payload: {
        token: process.env.SLACK_BOT_TOKEN,
        name: ingredients.text.replace(/^<@U5DTPL59V> :(.*):/, "$1"),
        channel: ingredients.channel,
        timestamp: ingredients.ts
    }
}))


export default applet.getApplet()
