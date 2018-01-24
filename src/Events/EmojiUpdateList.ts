import * as log from "fancy-log";

import { GuildEmoji, TextChannel } from "discord.js";

import { GuildConfiguration } from "../Database/Models/GuildConfiguration";
import { EventBase } from "../Lib/EventBase";

export class EmojiUpdateList extends EventBase {
    public subscribe = "emojiUpdate";
    constructor() {
        super();
    }
    public async run(oldEmoji: GuildEmoji, newEmoji: GuildEmoji) {
        const guildConfiguration = await GuildConfiguration.findOne({where: {guildID: newEmoji.guild.id.toString()}});
        const guildConfig = JSON.parse(guildConfiguration.settings);
        const emojiChangelog = await newEmoji.guild.channels.find("name", guildConfig.changelog) as TextChannel;
        if (!emojiChangelog) { return; }
        if (oldEmoji.name === newEmoji.name) { return; }

        emojiChangelog.send(`✏️ Updated ${newEmoji}, renamed to \`:${newEmoji.name}:\``);
    }
}
