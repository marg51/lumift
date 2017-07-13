import match from "../../../utils/match"

let webhook: TRIGGER_WEBHOOK = {
    id: "slack:all-events",
    type: "webhook", // "action"
    service: "slack",
    name: "All events",
    extract_ingredients: ({ body }) => {
        return body
    },
    webhook_config: {
        _filters: ({ body, config }) => match(body, config),
    },
}

module.exports = webhook