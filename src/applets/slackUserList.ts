import SlackService from "../services/slack"
import AnyTrigger from "../services/slack/triggers/rtm"
import SlackMessageAction from "../services/slack/actions/new-message"
import UtoLog from "../services/uto/actions/termlog"

import match from "../utils/match"


const waver: APPLET = {
    id: "applet-slack-user-list",
    name: "slackUserList",
    service: SlackService,
    trigger: AnyTrigger,
    actions: [UtoLog],
    stream_config: {
        token: process.env.SLACK_BOT_TOKEN
    },
    config: {
        [AnyTrigger.id]: {
            type: "started"
        },
        [UtoLog.id]: ({ ingredients }) => {
            return ingredients.payload.users
                .filter(({ deleted }) => !deleted)
                .map(({ name, id }) => id + " | " + name)
                .join("\n")
        }
    },
}

export default waver
