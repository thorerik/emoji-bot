import * as log from "fancy-log";

import { Emoji, TextChannel } from "discord.js";

import { EventBase } from "../Lib/EventBase";

export class EmojiCreateList extends EventBase {
    public subscribe = "emojiCreate";
    constructor() {
        super();
    }
    public async run(emoji: Emoji) {
        const emojiChangelog = await emoji.guild.channels.find("name", "emoji-changelog") as TextChannel;
        if (!emojiChangelog) { return; }

        emojiChangelog.send(`✅ Created ${emoji} \`:${emoji.name}:\``);
    }
}
