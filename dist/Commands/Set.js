"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const GuildConfiguration_1 = require("../Database/Models/GuildConfiguration");
class Set {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.help = "Sets bot settings for the guild";
        this.examples = [
            "set prefix !",
            "set changelog emoji-changelog",
            "set list emoji-list",
        ];
        this.permissionRequired = discord_js_1.Permissions.FLAGS.ADMINISTRATOR;
    }
    async run(message, args) {
        const guildConfiguration = await GuildConfiguration_1.GuildConfiguration.findOne({ where: { guildID: message.guild.id.toString() } });
        const settings = JSON.parse(guildConfiguration.settings);
        const setting = args.shift();
        const newSetting = args.shift();
        settings[setting] = newSetting;
        guildConfiguration.settings = JSON.stringify(settings);
        await guildConfiguration.save();
        await message.reply(`${setting} changed to ${newSetting}`);
    }
}
exports.Set = Set;
