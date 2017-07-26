import Service from "../"
const applet: TRIGGER_WEBHOOK<UTO_WEBHOOK> = {
    id: "uto:any",
    type: "webhook", // "action"
    service: Service,
    name: "New Issue",
    extract_ingredients: ({ body }) => {
        return body
    },
}

export default applet