interface TRIGGER_BASE<T> {
    id: string
    service: SERVICE
    name: string
    extract_ingredients: (event: any) => T
}


type TRIGGER_FILTERS<T> = ({ body, config }: { body: T, config: MATCH_PARTIAL<T> }) => boolean


type APPLET_CONFIG<T> = any & STREAM_CONFIG<T> & WEBHOOK_CONFIG<T>

type TRIGGER<T> = TRIGGER_STREAM<T> | TRIGGER_WEBHOOK<T>

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
    actions: ACTION<any>[]
    stream_config?: any
    webhook_config?: any
    config?: {
        scheduler?: SCHEDULER_CONFIG<T>
        webhook?: WEBHOOK_CONFIG<T>
        stream?: STREAM_CONFIG<T>
    }
}

type SCHEDULER_CONFIG<T> = {
    getKey?: (ingredients: T) => any
    debounce?: number
    throttle?: number
    waitCalls?: number
    buffer?: {
        until: PAYLOAD_CALLBACK
        map?: (item: T, context: any) => any
    }
}

// type CONTEXT<T, P> = {
//     applet: APPLET<T>
//     payload: P
//     ingredients: T
//     context: {
//         buffer?: any[]
//         hold: any
//     }
// }

type ANY_OBJECT = {
    [key: string]: any
}











type SLACK_EVENT = SLACK_STARTED | SLACK_MESSAGE

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

type SLACK_ACTION_REACTIONSADD = {
    action: "reactions.add"
    payload: {
        token: string
        name: string
        channel: string
        timestamp: string | number
    }
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

type MATCH_PARTIAL<T> = {
    [P in keyof T]?: MATCH_SPECIAL | T[P] | RegExp | (RegExp | string)[]
}
type MATCH_SPECIAL = {
    $in?: (string | RegExp)[],
    $exclude?: (string | RegExp) | (string | RegExp)[],
    $defined?: true
    $contains?: (string | RegExp)[]
}
type MATCH_SPECIAL_NESTED = {
    [key: string]: MATCH_SPECIAL
}

