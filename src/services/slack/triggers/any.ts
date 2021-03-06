import match from "../../../utils/match"
import Service from "../"

let webhook: TRIGGER_WEBHOOK<SLACK_WEBHOOK> = {
    id: "slack:all-events",
    type: "webhook", // "action"
    service: Service,
    name: "All events",
    extract_ingredients: ({ body }): SLACK_WEBHOOK => {
        return body
    },
    webhook_config: {
        ...Service.webhook_config,
        _filters: ({ body, config }) => match(body, config),
    },
}

export default webhook