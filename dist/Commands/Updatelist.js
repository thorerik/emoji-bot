"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const GuildConfiguration_1 = require("../Database/Models/GuildConfiguration");
class Updatelist {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.help = "Updates emoji list in guild's list channel";
        this.examples = [
            "updatelist",
        ];
        this.permissionRequired = discord_js_1.Permissions.FLAGS.MANAGE_EMOJIS;
    }
    async run(message, args) {
        const guildConfiguration = await GuildConfiguration_1.GuildConfiguration.findOne({ where: { guildID: message.guild.id.toString() } });
        const guildConfig = JSON.parse(guildConfiguration.settings);
        const emojiListChannel = await message.guild.channels.find("name", guildConfig.list);
        if (!emojiListChannel) {
            return;
        }
        const messages = await emojiListChannel.messages.fetch();
        await messages.forEach(async (m) => {
            await m.delete();
        });
        let msg = "";
        await emojiListChannel.guild.emojis.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        }).forEach((e) => msg += `${e} \`\`:${e.name}:\`\`\n`);
        const messageChunks = discord_js_1.Util.splitMessage(msg);
        if (typeof messageChunks === "object") {
            messageChunks.forEach((chunk) => {
                emojiListChannel.send(chunk);
            });
        }
        else {
            emojiListChannel.send(messageChunks);
        }
    }
}
exports.Updatelist = Updatelist;
