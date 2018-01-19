import { Emoji, TextChannel } from "discord.js";

import { GuildConfiguration } from "../Database/Models/GuildConfiguration";
import { EventBase } from "../Lib/EventBase";

export class EmojiDeleteList extends EventBase {
    public subscribe = "emojiDelete";
    constructor() {
        super();
    }
    public async run(emoji: Emoji) {
        const guildConfiguration = await GuildConfiguration.findOne({where: {guildID: emoji.guild.id.toString()}});
        const guildConfig = JSON.parse(guildConfiguration.settings);
        const emojiChangelog = await emoji.guild.channels.find("name", guildConfig.changelog) as TextChannel;
        if (!emojiChangelog) { return; }

        emojiChangelog.send(`🗑️ Removed \`:${emoji.name}:\``);
    }
}
