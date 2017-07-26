import { createLogger } from "./log"
const logger = createLogger("parseParams")

export default function parseParam<T, P>(value: PAYLOAD_CALLBACK, { applet, ingredients, scheduler, action }: CONTEXT<T, P>): P {
    try {
        return value({ applet, ingredients, scheduler, action })
    } catch (e) {
        logger.error(e.message)
    }
}