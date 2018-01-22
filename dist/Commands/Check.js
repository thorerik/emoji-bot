"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const log = require("fancy-log");
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
    }
    async run(message, args) {
        const props = Properties_1.Properties.getInstance();
        const subCommand = args.shift();
        if (subCommand === "sanity") {
            await this.sanityCheck(props);
        }
        else if (subCommand === "guild") {
            await this.guildCheck(props, message, args);
        }
    }
    async sanityCheck(props) {
        await props.client.guilds.array().forEach(async (guild) => {
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
    async guildCheck(props, message, args) {
        const gid = args.shift();
        let guild;
        let guildConfiguration;
        try {
            guild = await props.client.guilds.get(gid);
            guildConfiguration = await GuildConfiguration_1.GuildConfiguration.findOne({ where: { guildID: gid } });
        }
        catch (e) {
            const err = new LogError_1.LogError();
            err.Log(e);
            return message.reply(`Error, check logs`);
        }
        const guildConfig = JSON.parse(guildConfiguration.settings);
        const embed = new discord_js_1.MessageEmbed();
        embed.color = discord_js_1.Util.resolveColor([0, 255, 255]);
        embed.thumbnail = { url: guild.icon };
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
        embed.addField("Owner", `${guild.owner.user.username}#${guild.owner.user.discriminator}`, true);
        embed.addField("Emojis", guild.emojis.size, true);
        embed.addField("Users", guild.memberCount, true);
        embed.addField("Channels", guild.channels.size, true);
        embed.addField("Prefix", guildConfig.prefix, true);
        embed.addField("Changelog Channel", `${guildConfig.changelog} ${guild.channels.find("name", guildConfig.changelog) ? check : cross}`, true);
        embed.addField("List Channel", `${guildConfig.list} ${guild.channels.find("name", guildConfig.list) ? check : cross}`, true);
        message.channel.send({ embed });
    }
}
exports.Check = Check;
