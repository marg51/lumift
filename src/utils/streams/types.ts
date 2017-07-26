type TRIGGER_STREAM<T> = {
    type: "stream"
    stream_config: STREAM_CONFIG<T>
} & TRIGGER_BASE<T>

type STREAM_CONFIG<T> = {
    start: (config: APPLET_CONFIG<T>, onEvent?: STREAM_CONFIG_START_CALLBACK) => any,
    _filters: TRIGGER_FILTERS<T>
}

type STREAM_CONFIG_START_CALLBACK = ({ type, payload }: { type: string, payload: any }) => any