import { createLogger } from "./log"
const logger = createLogger("parseParams")

export default function parseParam(value: parseParamValue, { applet, ingredients, config, context }: CONTEXT): any {
    if (typeof value == "function") {
        try {
            return value({ applet, ingredients, config, context })
        } catch (e) {
            logger.error(e.message)
        }
    }

    return value
}

type parseParamValue = (context: CONTEXT) => ANY_OBJECT

type parseParam = (value: parseParamValue, { applet, ingredients, config, context }: CONTEXT) => any