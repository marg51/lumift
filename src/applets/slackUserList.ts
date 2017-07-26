import StartedTrigger from "../services/slack/triggers/rtm-started"
// import SlackMessageAction from "../services/slack/actions/new-message"
import UtoLog from "../services/uto/actions/termlog"

import Applet from "../utils/applet"

const applet = new Applet<SLACK_STARTED>("slack user list", {
    stream_config: {
        token: process.env.SLACK_BOT_TOKEN
    }
})

applet.addTrigger(StartedTrigger, {
    type: "started"
})

applet.addAction(UtoLog, ({ ingredients }) => {
    return ingredients.payload.users
        .filter(({ deleted }) => !deleted)
        .map(({ name, id }) => id + " | " + name)
        .join("\n")
})

export default applet.getApplet()