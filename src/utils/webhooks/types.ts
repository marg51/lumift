type TRIGGER_WEBHOOK = {
    type: "webhook"
    webhook_config: WEBHOOK_CONFIG
    stream_config?: any
} & TRIGGER_BASE

type WEBHOOK_CONFIG = {
    _filters: TRIGGER_FILTERS
}