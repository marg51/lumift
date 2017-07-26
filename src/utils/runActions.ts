const logger = require("./log").createLogger("runActions")
import schedule from "./scheduler"
import parseParams from "./parseParams"

// context can be a stream
export default <T>(applet: APPLET<T>, ingredients: T) => {
    schedule(applet, applet.config.scheduler, ingredients, (data, scheduler) => {
        logger.log(applet.name, "(", applet.actions.length, "actions )")
        applet.actions.map(action => {
            const { exec, id } = action
            exec({ applet, payload: parseParams(applet.config[id], { applet, ingredients, scheduler, action }) })
        }
        )
    })

}
