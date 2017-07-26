export default (applet: APPLET<any>): APPLET<any> => {
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
