"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventBase_1 = require("../Lib/EventBase");
class EmojiCreateList extends EventBase_1.EventBase {
    constructor() {
        super();
        this.subscribe = "emojiCreate";
    }
    async run(emoji) {
        const emojiChangelog = await emoji.guild.channels.find("name", "emoji-changelog");
        if (!emojiChangelog) {
            return;
        }
        emojiChangelog.send(`✅ Created ${emoji} \`:${emoji.name}:\``);
    }
}
exports.EmojiCreateList = EmojiCreateList;
