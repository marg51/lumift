import { createLogger } from "../../utils/log"

const logger = createLogger("service/slack")

const slackService: SERVICE = {
    id: "slack",
    name: "Slack",
    webhook_config: {
        url: "/slack",
        method: "POST",
        inline_validation_config: {},
        transform: body => {
            try {
                return JSON.parse(decodeURIComponent(body.replace("payload=", "")))
            } catch (e) {
                logger.error(body)
            }
        },
    },
    triggers: [],
    actions: [],
}

export default slackService