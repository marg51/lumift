const logger = require("../../../utils/log").createLogger("slack/new-message")

import sendPushNotification from "../utils/send-push-notification"

import parseParam from "../../../utils/parseParams"
import Service from ".."

const action: ACTION<any> = {
    id: "ios:push-notification",
    name: "Send push notification",
    service: Service,
    exec(applet, ingredients, config, context) {
        const { token } = config

        logger.log(parseParam(config, { applet, ingredients, config, context }))
        sendPushNotification(
            parseParam(config, { applet, ingredients, config, context })
        )
    },
}

export default action