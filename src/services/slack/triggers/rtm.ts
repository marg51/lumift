import match from "../../../utils/match"
import Service from "../"

import rtm from "../utils/rtm-connection"

const stream: TRIGGER_STREAM = {
    id: "slack:all-rtm-events",
    type: "stream", // "action"
    service: Service,
    name: "All RTM events",
    extract_ingredients: event => event,
    stream_config: {
        start: (config, onEvent) => rtm(config, onEvent),
        _filters: ({ body, config }) => match(body, config),
    },
}

export default stream
