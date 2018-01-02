import * as log from "fancy-log";

import { Emoji, TextChannel } from "discord.js";

import { EventBase } from "../Lib/EventBase";

export class EmojiUpdateList extends EventBase {
    public subscribe = "emojiUpdate";
    constructor() {
        super();
    }
    public async run(oldEmoji: Emoji, newEmoji: Emoji) {
        const emojiChangelog = await newEmoji.guild.channels.find("name", "emoji-changelog") as TextChannel;
        if (!emojiChangelog) { return; }
        if (oldEmoji.name === newEmoji.name) { return; }

        emojiChangelog.send(`✏️ Updated ${newEmoji}, renamed to \`:${newEmoji.name}:\``);
    }
}
