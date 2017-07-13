type TRIGGER_STREAM = {
    type: "stream"
    stream_config: STREAM_CONFIG
} & TRIGGER_BASE

type STREAM_CONFIG = {
    start: (config: APPLET_CONFIG, onEvent?: STREAM_CONFIG_START_CALLBACK) => any,
    _filters: TRIGGER_FILTERS
}

type STREAM_CONFIG_START_CALLBACK = ({ type, payload }: { type: string, payload: any }) => any