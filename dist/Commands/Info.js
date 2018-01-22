"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const GuildConfiguration_1 = require("../Database/Models/GuildConfiguration");
const Properties_1 = require("../Lib/Properties");
class Info {
    constructor() {
        this.help = "Gets you some information about the bot";
        this.examples = [
            "info",
        ];
        this.permissionRequired = discord_js_1.Permissions.FLAGS.SEND_MESSAGES;
        this.props = Properties_1.Properties.getInstance();
    }
    async run(message, args) {
        const guildConfiguration = await GuildConfiguration_1.GuildConfiguration.findOne({ where: { guildID: message.guild.id.toString() } });
        const guildConfig = JSON.parse(guildConfiguration.settings);
        const version = require("../../package.json").version;
        const embed = new discord_js_1.MessageEmbed();
        embed.color = discord_js_1.Util.resolveColor([0, 255, 255]);
        embed.thumbnail = { url: "https://i.imgur.com/ibsHxIR.png" };
        embed.title = "About Emoji bot";
        embed.author = {
            iconURL: "https://i.imgur.com/ibsHxIR.png",
            name: "Emojibot",
        };
        embed.footer = {
            text: "Created by Tuxy Fluffyclaws#5072",
        };
        embed.addField("Version", version);
        embed.addField("Author", "Tuxy Fluffyclaws#5072", true);
        embed.addField("Support guild", "https://discord.gg/yk8z9bz", true);
        embed.addField("Guilds", this.props.client.guilds.size, true);
        embed.addField("Users", this.props.client.users.size, true);
        embed.addField("Prefix", guildConfig.prefix, true);
        embed.addField("Changelog Channel", guildConfig.changelog, true);
        embed.addField("List Channel", guildConfig.list, true);
        message.channel.send({ embed });
    }
}
exports.Info = Info;
