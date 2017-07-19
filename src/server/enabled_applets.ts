export const applets: APPLET[] = [
    require("../applets/emojiReply"),
    require("../applets/emojiReplySomeoneElse"),
    require("../applets/ping")
].map((applet) => applet.default)