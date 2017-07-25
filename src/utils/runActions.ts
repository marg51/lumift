const logger = require("./log").createLogger("runActions")
import schedule from "./scheduler"

// context can be a stream
export default (applet: APPLET, ingredients: any) => {
    schedule(applet, applet.config.scheduler, ingredients, (data, context) => {
        logger.log(applet.name, "(", applet.actions.length, "actions )")
        applet.actions.map(({ exec, id }) =>
            exec(applet, data, applet.config[id], context)
        )
    })

}
