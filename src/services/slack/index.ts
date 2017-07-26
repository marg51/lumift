const slackService: SERVICE = {
    id: "slack",
    name: "Slack",
    webhook_config: {
        url: "/slack",
        method: "POST",
        inline_validation_config: {},
        transform: body =>
            JSON.parse(decodeURIComponent(body.replace("payload=", ""))),
    },
    triggers: [],
    actions: [],
}

export default slackService