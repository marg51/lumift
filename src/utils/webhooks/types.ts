type TRIGGER_WEBHOOK = {
    type: "webhook"
    webhook_config?: WEBHOOK_CONFIG
    stream_config?: any
} & TRIGGER_BASE

type WEBHOOK_CONFIG = {
    method: string
    url: string
    pubsubhubbub_validation_config?: any
    crc_validation_config?: any
    transform?: (data: any) => any
    inline_validation_config?: any
    filters?: TRIGGER_FILTERS
    _filters: TRIGGER_FILTERS
}