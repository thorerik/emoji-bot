import { Emoji, TextChannel } from "discord.js";

import { EventBase } from "../Lib/EventBase";

export class EmojiDeleteList extends EventBase {
    public subscribe = "emojiDelete";
    constructor() {
        super();
    }
    public async run(emoji: Emoji) {
        const emojiChangelog = await emoji.guild.channels.find("name", "emoji-changelog") as TextChannel;
        if (!emojiChangelog) { return; }

        emojiChangelog.send(`🗑️ Removed \`:${emoji.name}:\``);
    }
}
