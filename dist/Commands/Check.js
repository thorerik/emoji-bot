"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const log = require("fancy-log");
const snekfetch = require("snekfetch");
const GuildConfiguration_1 = require("../Database/Models/GuildConfiguration");
const LogError_1 = require("../Lib/LogError");
const Properties_1 = require("../Lib/Properties");
class Check {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.help = "Various check commands";
        this.examples = [
            "check sanity",
            "check guild <id>",
        ];
        this.permissionRequired = "BOT_OWNER";
        this.props = Properties_1.Properties.getInstance();
    }
    async run(message, args) {
        const subCommand = args.shift();
        if (subCommand === "sanity") {
            await this.sanityCheck();
        }
        else if (subCommand === "guild") {
            await this.guildCheck(message, args);
        }
    }
    async sanityCheck() {
        await this.props.client.guilds.array().forEach(async (guild) => {
            let msg = "";
            const guildConfiguration = await GuildConfiguration_1.GuildConfiguration.findOne({ where: { guildID: guild.id.toString() } });
            if (guildConfiguration) {
                msg += `${guild.name} (${guild.id}) OK`;
                msg += "\n";
            }
            else {
                msg += `${guild.name} (${guild.id}) Not OK`;
                msg += "\n";
            }
            log(msg);
        });
    }
    async guildCheck(message, args) {
        const guildParam = args.shift();
        let guildConfiguration;
        let guildConfig;
        try {
            await this.getGuild(guildParam);
            guildConfiguration = await GuildConfiguration_1.GuildConfiguration.findOne({ where: { guildID: this.guild.id } });
            guildConfig = JSON.parse(guildConfiguration.settings);
        }
        catch (e) {
            const err = new LogError_1.LogError();
            err.Log(e);
            return message.reply(`Error, check logs`);
        }
        const embed = new discord_js_1.MessageEmbed();
        embed.color = discord_js_1.Util.resolveColor([0, 255, 255]);
        embed.thumbnail = { url: this.guild.iconURL() };
        embed.title = "About Emoji bot";
        embed.author = {
            iconURL: "https://i.imgur.com/ibsHxIR.png",
            name: "Emojibot",
        };
        embed.footer = {
            text: "Created by Tuxy Fluffyclaws#5072",
        };
        const cross = "❎";
        const check = "✅";
        embed.addField("Owner", `${this.guild.owner.user.username}#${this.guild.owner.user.discriminator}`, true);
        embed.addField("Emojis", this.guild.emojis.size, true);
        embed.addField("Users", this.guild.memberCount, true);
        embed.addField("Channels", this.guild.channels.size, true);
        embed.addField("Prefix", guildConfig.prefix, true);
        embed.addField("Changelog Channel", `${guildConfig.changelog} ${this.guild.channels.find("name", guildConfig.changelog) ? check : cross}`, true);
        embed.addField("List Channel", `${guildConfig.list} ${this.guild.channels.find("name", guildConfig.list) ? check : cross}`, true);
        message.channel.send({ embed });
    }
    async getGuild(guildParam) {
        const invite = discord_js_1.DataResolver.resolveInviteCode(guildParam);
        try {
            if (invite) {
                const inviteData = await snekfetch.get(`https://discordapp.com/api/invite/${invite}`);
                this.guild = await this.props.client.guilds.get(inviteData.body.guild.id);
            }
            else {
                this.guild = await this.props.client.guilds.get(guildParam);
            }
        }
        catch (e) {
            throw Error(e);
        }
    }
}
exports.Check = Check;
