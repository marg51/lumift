const logger = require("../log.js").createLogger("streams/register")
import match from "../match"
import decorateApplet from "./decorateApplet"

import runActions from "../runActions"

export default (applet: APPLET<any>): void => {
    applet = decorateApplet(applet)

    applet.config.stream.start(applet.config.stream, (event) => {
        if (match(event, applet.config[applet.trigger.id])) {
            runActions(applet, applet.trigger.extract_ingredients(event))
        }
    })
}
