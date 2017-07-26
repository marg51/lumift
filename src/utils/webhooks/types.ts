type TRIGGER_WEBHOOK<T> = {
    type: "webhook"
    webhook_config?: WEBHOOK_CONFIG<T>
    stream_config?: any
    id: string
    service: SERVICE
    name: string
    extract_ingredients: (event: any) => T
}

type WEBHOOK_CONFIG<T> = {
    method: string
    url: string
    pubsubhubbub_validation_config?: any
    crc_validation_config?: any
    transform?: (data: any) => any
    inline_validation_config?: any
    filters?: TRIGGER_FILTERS<T>
    _filters: TRIGGER_FILTERS<T>
}