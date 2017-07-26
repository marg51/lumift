const logger = require("../../../utils/log").createLogger("uto/log")
import service from "../"
import parseParam from "../../../utils/parseParams"

const action: ACTION = {
    id: "uto:log",
    name: "prints value to terminal",
    service: service,
    exec(applet, ingredients, config, context) {
        logger.warn(parseParam(config, { applet, ingredients, config, context }))
    },
}

export default action