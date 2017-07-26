const logger = require("../../../utils/log").createLogger("slack/new-message")

import sendPushNotification from "../utils/send-push-notification"

import parseParam from "../../../utils/parseParams"
import Service from ".."


const action: ACTION<IOS_PUSH_PAYLOAD> = {
    id: "ios:push-notification",
    name: "Send push notification",
    service: Service,
    exec({ payload }) {

        sendPushNotification(
            payload
        )
    },
}

export default action