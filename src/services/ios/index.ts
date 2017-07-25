import pushNotifications from "./actions/push-notification"

const service: SERVICE = {
    id: "ios",
    name: "iOS",
    triggers: [],
    actions: [pushNotifications],
}

export default service