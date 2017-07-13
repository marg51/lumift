const logger = require("../../../utils/log").createLogger("uto/log")
import service from "../"

const action: ACTION = {
    id: "uto:log",
    name: "prints value to terminal",
    service: service,
    exec(applet, ingredients) {
        logger.warn(ingredients)
    },
}

export default action