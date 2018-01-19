"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GuildConfiguration_1 = require("../Database/Models/GuildConfiguration");
const EventBase_1 = require("../Lib/EventBase");
class EmojiDeleteList extends EventBase_1.EventBase {
    constructor() {
        super();
        this.subscribe = "emojiDelete";
    }
    async run(emoji) {
        const guildConfiguration = await GuildConfiguration_1.GuildConfiguration.findOne({ where: { guildID: emoji.guild.id.toString() } });
        const guildConfig = JSON.parse(guildConfiguration.settings);
        const emojiChangelog = await emoji.guild.channels.find("name", guildConfig.changelog);
        if (!emojiChangelog) {
            return;
        }
        emojiChangelog.send(`🗑️ Removed \`:${emoji.name}:\``);
    }
}
exports.EmojiDeleteList = EmojiDeleteList;
