interface TRIGGER_BASE<T> {
    id: string
    service: SERVICE
    name: string
    extract_ingredients: (event: any) => T
}


type TRIGGER_FILTERS<T> = ({ body, config }: { body: T, config: APPLET_CONFIG<T> }) => boolean


type APPLET_CONFIG<T> = any & STREAM_CONFIG<T> & WEBHOOK_CONFIG<T>

type TRIGGER<T> = TRIGGER_STREAM<T> | TRIGGER_WEBHOOK<T>

type ACTION<T> = {
    id: string
    service: SERVICE
    name: string
    exec: (applet: APPLET<T>, ingredients: any, config: APPLET_CONFIG<T>, context?: any) => void
    [key: string]: any
}

type SERVICE = {
    id: string
    name: string
    webhook_config?: {
        url: string
        method: "GET" | "POST"
        transform?: (body: any) => any
        inline_validation_config?: any
        pubsubhubbub_validation_config?: {
            token: string
        }
        crc_validation_config?: {
            secret: string
        }
    }
    triggers: TRIGGER<any>[]
    actions: ACTION<any>[]
}

interface APPLET<T> {
    id: string
    name: string
    service: SERVICE
    trigger: TRIGGER<T>
    actions: ACTION<T>[]
    stream_config?: any
    webhook_config?: any
    config: {
        scheduler?: SCHEDULER_CONFIG<T>
        webhook?: WEBHOOK_CONFIG<T>
        stream?: STREAM_CONFIG<T>
        [key: string]: CONTEXT_CALLBACK<T> | ANY_OBJECT
    }
}

type CONTEXT_CALLBACK<T> = (context: CONTEXT<T>) => ANY_OBJECT
type SCHEDULER_CONFIG<T> = {
    getKey?: (ingredients: T) => any
    debounce?: number
    throttle?: number
    waitCalls?: number
    activate?: {
        until: (obj: CONTEXT<T>) => boolean
        when: (ingredients: T) => boolean
        map?: (ingredients: T) => any
    }
    hold?: {
        until: (obj: CONTEXT<T>) => boolean
        when: (ingredients: T) => boolean
        map?: (ingredients: T) => any
    }
    buffer?: {
        until: (obj: CONTEXT<T>) => boolean
        map?: (item: T, context: any) => any
    }
}

type CONTEXT<T> = {
    applet: APPLET<T>
    config: any
    ingredients: T
    context: {
        buffer?: any[]
        hold: any
    }
}

type ANY_OBJECT = {
    [key: string]: any
}











type SLACK_EVENT = {
    type: string
    [key: string]: any
}

type SLACK_STARTED = {
    type: "started"
    payload: ANY_OBJECT
}
type SLACK_MESSAGE = {
    type?: "message"
    token: string
    channel: string
    user?: string
    text?: string
    attachments?: any[]
    ts?: number
}

// https://api.slack.com/docs/message-buttons
type SLACK_WEBHOOK = {
    actions: { name: string, value: string, type: string }[]
    callback_id: string
    team: { id: string, name: string }
    channel: { id: string, name: string }
    user: { id: string, name: string }
}

type UTO_WEBHOOK = {
    message: string
}