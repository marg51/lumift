const logger = require("../../../utils/log").createLogger("uto/log")
import service from "../"
import parseParam from "../../../utils/parseParams"

const action: ACTION<any> = {
    id: "uto:log",
    name: "prints value to terminal",
    service: service,
    exec({ payload }) {
        logger.warn(payload)
    },
}

export default action