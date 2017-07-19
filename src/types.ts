interface TRIGGER_BASE {
    id: string
    service: string
    name: string
    extract_ingredients: (event: any) => any
}


type TRIGGER_FILTERS = ({ body: any, config: APPLET_CONFIG }) => boolean


type APPLET_CONFIG = any & STREAM_CONFIG & WEBHOOK_CONFIG

type TRIGGER = TRIGGER_STREAM | TRIGGER_WEBHOOK

type ACTION = {
    id: string
    service: SERVICE
    name: string
    exec: (applet: APPLET, ingredients: any, config: APPLET_CONFIG, context?: any) => void
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
    triggers: TRIGGER[]
    actions: ACTION[]
}

interface APPLET {
    id: string
    name: string
    service: SERVICE
    trigger: TRIGGER
    actions: ACTION[]
    stream_config?: any
    webhook_config?: any
    config: {
        scheduler?: SCHEDULER_CONFIG
        [key: string]: any
    }
}
type SCHEDULER_CONFIG = {
    getKey?: (ingredients: any) => any
    debounce?: number
    throttle?: number
    waitCalls?: number
    activate?: {
        until: (obj: any) => boolean
        when: (ingredients: any) => boolean
        map?: (ingredients: any) => any
    }
    hold?: {
        until: (obj: any) => boolean
        when: (ingredients: any) => boolean
        map?: (ingredients: any) => any
    }
    buffer?: {
        until: (obj: any) => boolean
        map?: (item: any, context: any) => any
    }
}

type CONTEXT = {
    applet: APPLET
    config: any
    ingredients: any
    context: {
        buffer?: any[]
        hold: any
    }
}

type ANY_OBJECT = {
    [key: string]: any
}