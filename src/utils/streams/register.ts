const logger = require("../log.js").createLogger("streams/register")
import match from "../match"
import decorateApplet from "./decorateApplet"

const runActions = require("../runActions")

export default (applet: APPLET): void => {
    applet = decorateApplet(applet)

    applet.config.stream.start(applet.config.stream, (event) => {
        if (match(event, applet.config[applet.trigger.id])) {
            runActions(applet, applet.trigger.extract_ingredients(event))
        }
    })
}
