import { DataResolver, Guild, Message, MessageEmbed, Permissions, Util } from "discord.js";

import * as log from "fancy-log";
import * as snekfetch from "snekfetch";

import { GuildConfiguration } from "../Database/Models/GuildConfiguration";
import { Command } from "../Lib/Command";
import { LogError } from "../Lib/LogError";
import { Properties } from "../Lib/Properties";
import { isNumber } from "util";

export class Check implements Command {
    // tslint:disable-next-line:max-line-length
    public help = "Various check commands";
    public examples = [
        "check sanity",
        "check guild <id>",
        "check guild <invite link>",
    ];
    public permissionRequired = "BOT_OWNER";

    private props = Properties.getInstance();

    private guild: Guild;

    public async run(message: Message, args: string[]) {
        const subCommand = args.shift();
        if (subCommand === "sanity") {
            await this.sanityCheck();
        } else if (subCommand === "guild") {
            await this.guildCheck(message, args);
        }
    }

    private async sanityCheck() {
        await this.props.client.guilds.array().forEach(async (guild) => {
            let msg = "";
            const guildConfiguration = await GuildConfiguration.findOne({ where: { guildID: guild.id.toString() } });
            if (guildConfiguration) {
                msg += `${guild.name} (${guild.id}) OK`;
                msg += "\n";
            } else {
                msg += `${guild.name} (${guild.id}) Not OK`;
                msg += "\n";
            }
            log(msg);
        });
    }

    private async guildCheck(message: Message, args: string[]) {
        const guildParam = args.shift();
        let guildConfiguration: GuildConfiguration;
        let guildConfig;
        try {
            await this.getGuild(guildParam);
            guildConfiguration = await GuildConfiguration.findOne({where: {guildID: this.guild.id}});
            guildConfig = JSON.parse(guildConfiguration.settings);
        } catch (e) {
            const err = new LogError();
            err.Log(e);
            return message.reply(`Error, check logs`);
        }

        const embed = new MessageEmbed();

        embed.color = Util.resolveColor([0, 255, 255]);

        embed.thumbnail = {url: this.guild.iconURL() };

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
        embed.addField("Changelog Channel", `${
                guildConfig.changelog
            } ${
                this.guild.channels.find("name", guildConfig.changelog) ? check : cross
            }`, true);
        embed.addField("List Channel", `${
                guildConfig.list
            } ${
                this.guild.channels.find("name", guildConfig.list) ? check : cross
            }`, true);

        message.channel.send({embed});
    }

    private async getGuild(guildParam: string) {
        try {
            if (!isNumber(guildParam)) {
                const invite = DataResolver.resolveInviteCode(guildParam);
                const inviteData = await snekfetch.get(`https://discordapp.com/api/invite/${invite}`);
                this.guild = await this.props.client.guilds.get(inviteData.body.guild.id);
            } else {
                this.guild = await this.props.client.guilds.get(guildParam);
            }
        } catch (e) {
            throw Error (e);
        }
    }
}
