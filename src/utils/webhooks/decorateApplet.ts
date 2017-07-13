export default (applet: APPLET): APPLET => {
    const webhook = {
        ...applet.service.webhook_config,
        ...applet.webhook_config
    }

    const config = {
        ...applet.config,
        webhook
    }

    return {
        ...applet,
        config
    }
}
