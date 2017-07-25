export const applets: APPLET[] = [
    require("../applets/emojiReply"),
    require("../applets/ping"),
    require("../applets/anyWebhookToSlack")
].map((applet) => applet.default)