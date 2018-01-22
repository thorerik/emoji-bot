import { Guild, Message, MessageEmbed, Permissions, Util } from "discord.js";

import * as log from "fancy-log";

import { GuildConfiguration } from "../Database/Models/GuildConfiguration";
import { Command } from "../Lib/Command";
import { LogError } from "../Lib/LogError";
import { Properties } from "../Lib/Properties";

export class Check implements Command {
    // tslint:disable-next-line:max-line-length
    public help = "Various check commands";
    public examples = [
        "check sanity",
        "check guild <id>",
    ];
    public permissionRequired = "BOT_OWNER";

    public async run(message: Message, args: string[]) {
        const props = Properties.getInstance();
        const subCommand = args.shift();
        if (subCommand === "sanity") {
            await this.sanityCheck(props);
        } else if (subCommand === "guild") {
            await this.guildCheck(props, message, args);
        }
    }

    private async sanityCheck(props: Properties) {
        await props.client.guilds.array().forEach(async (guild) => {
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

    private async guildCheck(props: Properties, message: Message, args: string[]) {
        const gid = args.shift();
        let guild: Guild;
        let guildConfiguration: GuildConfiguration;
        try {
                guild = await props.client.guilds.get(gid);
                guildConfiguration = await GuildConfiguration.findOne({where: {guildID: gid}});
            } catch (e) {
                const err = new LogError();
                err.Log(e);
                return message.reply(`Error, check logs`);
            }
        const guildConfig = JSON.parse(guildConfiguration.settings);

        const embed = new MessageEmbed();

        embed.color = Util.resolveColor([0, 255, 255]);

        embed.thumbnail = {url: guild.iconURL() };

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
        embed.addField("Changelog Channel", `${
                guildConfig.changelog
            } ${
                guild.channels.find("name", guildConfig.changelog) ? check : cross
            }`, true);
        embed.addField("List Channel", `${
                guildConfig.list
            } ${
                guild.channels.find("name", guildConfig.list) ? check : cross
            }`, true);

        message.channel.send({embed});
    }
}
