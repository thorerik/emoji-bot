"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GuildConfiguration_1 = require("../Database/Models/GuildConfiguration");
const EventBase_1 = require("../Lib/EventBase");
class EmojiUpdateList extends EventBase_1.EventBase {
    constructor() {
        super();
        this.subscribe = "emojiUpdate";
    }
    async run(oldEmoji, newEmoji) {
        const guildConfiguration = await GuildConfiguration_1.GuildConfiguration.findOne({ where: { guildID: newEmoji.guild.id.toString() } });
        const guildConfig = JSON.parse(guildConfiguration.settings);
        const emojiChangelog = await newEmoji.guild.channels.find("name", guildConfig.changelog);
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
