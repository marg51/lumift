const slackService: SERVICE = {
    id: "slack",
    name: "Slack",
    webhook_config: {
        url: "/slack",
        method: "POST",
        inline_validation_config: {},
    },
    triggers: [],
    actions: [],
}

export default slackService