require("dotenv").config()
require('source-map-support').install()

import { createLogger } from "../utils/log"

const logger = createLogger("server")

import webhook_register from "../utils/webhooks/register"
import stream_register from "../utils/streams/register"

import { applets } from "./enabled_applets"

logger.warn("registering", applets.length, "applets")
applets.map(
    applet => {
        if (applet.trigger.type == "webhook")
            webhook_register(applet)
        else if (applet.trigger.type == "stream")
            stream_register(applet)
    }
)
