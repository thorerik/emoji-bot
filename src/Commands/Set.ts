import { Message, Permissions, TextChannel, Util } from "discord.js";

import * as log from "fancy-log";

import { GuildConfiguration } from "../Database/Models/GuildConfiguration";
import { Command } from "../Lib/Command";
import { Properties } from "../Lib/Properties";

export class Set implements Command {
    // tslint:disable-next-line:max-line-length
    public help = "Sets bot settings for the guild";
    public examples = [
        "set prefix !",
    ];
    public permissionRequired = Permissions.FLAGS.ADMINISTRATOR;

    public async run(message: Message, args: string[]) {
        const guildConfiguration = await GuildConfiguration.findOne({where: {guildID: message.guild.id.toString()}});
        const settings = JSON.parse(guildConfiguration.settings);
        const setting = args.shift();
        const newSetting = args.shift();
        settings[setting] = newSetting;

        guildConfiguration.settings = JSON.stringify(settings);
        await guildConfiguration.save();

        await message.reply(`${setting} changed to ${newSetting}`);
    }
}
