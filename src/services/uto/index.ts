const anyTrigger = require("./triggers/any")

const service: SERVICE = {
    id: "github",
    name: "Github",
    webhook_config: {
        url: "/any",
        method: "POST",
    },
    triggers: [anyTrigger],
    actions: [],
}

export default service