export default (applet: APPLET<any>): APPLET<any> => {
    const stream = {
        ...applet.trigger.stream_config,
        ...applet.stream_config
    }

    const config = { ...applet.config, stream }

    return { ...applet, config }
}
