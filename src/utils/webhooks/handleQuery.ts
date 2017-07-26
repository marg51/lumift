const logger = require("../log.js").createLogger("webhooks/handleQuery")

import filterTrigger from "./filterTrigger"

import runActions from "../runActions"

export default (applet: APPLET<any>) => (req: any, res: any, next: any) => {
    try {
        let { params, body, headers } = req

        // slack :|
        if (
            applet.config.webhook.inline_validation_config &&
            req.params.type === "url_verification"
        ) {
            logger.success("slack webhook challenge returned")
            return req.params.challenge
        }

        if (applet.config.webhook.transform)
            body = applet.config.webhook.transform(body)

        const data = {
            params,
            body,
            headers,
            config: applet.config[applet.trigger.id],
        }

        const is_valid = filterTrigger(applet, data)

        if (!is_valid) {
            logger.log("skipping, filters not valid")
            return
        }

        runActions(applet, applet.trigger.extract_ingredients(data))
    } catch (e) {
        logger.error(e)
    }
}
