import { Message, MessageEmbed, Permissions, Util } from "discord.js";

import * as log from "fancy-log";

import { GuildConfiguration } from "../Database/Models/GuildConfiguration";
import { Command } from "../Lib/Command";
import { Properties } from "../Lib/Properties";

export class Info implements Command {
    public help = "Gets you some information about the bot";
    public examples = [
        "info",
    ];
    public permissionRequired = Permissions.FLAGS.SEND_MESSAGES;
    private props = Properties.getInstance();

    public async run(message: Message, args: string[]) {
        const guildConfiguration = await GuildConfiguration.findOne({where: {guildID: message.guild.id.toString()}});
        const guildConfig = JSON.parse(guildConfiguration.settings);
        const version = require("../../package.json").version;

        const embed = new MessageEmbed();

        embed.color = Util.resolveColor([0, 255, 255]);

        embed.thumbnail = {url: "https://i.imgur.com/ibsHxIR.png"};

        embed.title = "About Emoji bot";

        embed.author = {
            iconURL: "https://i.imgur.com/ibsHxIR.png",
            name: "Emojibot",
        };

        embed.footer = {
            text: "Created by Tuxy Fluffyclaws#1337",
        };

        embed.addField("Version", version);
        embed.addField("Author", "Tuxy Fluffyclaws#1337", true);
        embed.addField("Support guild", "https://discord.gg/yk8z9bz", true);
        embed.addField("Guilds", this.props.client.guilds.size, true);
        embed.addField("Users", this.props.client.users.size, true);
        embed.addField("Prefix", guildConfig.prefix, true);
        embed.addField("Changelog Channel", guildConfig.changelog, true);
        embed.addField("List Channel", guildConfig.list, true);

        message.channel.send({embed});
    }
}
