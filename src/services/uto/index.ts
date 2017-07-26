// import anyTrigger from "./triggers/any"

const service: SERVICE = {
    id: "github",
    name: "Github",
    webhook_config: {
        url: "/any",
        method: "POST",
    },
    triggers: [],
    actions: [],
}

export default service