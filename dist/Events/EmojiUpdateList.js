"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventBase_1 = require("../Lib/EventBase");
class EmojiUpdateList extends EventBase_1.EventBase {
    constructor() {
        super();
        this.subscribe = "emojiUpdate";
    }
    async run(oldEmoji, newEmoji) {
        const emojiChangelog = await newEmoji.guild.channels.find("name", "emoji-changelog");
        if (!emojiChangelog) {
            return;
        }
        if (oldEmoji.name === newEmoji.name) {
            return;
        }
        emojiChangelog.send(`✏️ Updated ${newEmoji}, renamed to \`:${newEmoji.name}:\``);
    }
}
exports.EmojiUpdateList = EmojiUpdateList;
