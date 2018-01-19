import { Message, Permissions, TextChannel, Util } from "discord.js";

import * as log from "fancy-log";

import { GuildConfiguration } from "../Database/Models/GuildConfiguration";
import { Command } from "../Lib/Command";
import { Properties } from "../Lib/Properties";

export class Updatelist implements Command {
    // tslint:disable-next-line:max-line-length
    public help = "Updates emoji list in guild's list channel";
    public examples = [
        "updatelist",
    ];
    public permissionRequired = Permissions.FLAGS.MANAGE_EMOJIS;

    public async run(message: Message, args: string[]) {
        const guildConfiguration = await GuildConfiguration.findOne({where: {guildID: message.guild.id.toString()}});
        const guildConfig = JSON.parse(guildConfiguration.settings);
        const emojiListChannel = await message.guild.channels.find("name", guildConfig.list) as TextChannel;
        if (!emojiListChannel) { return; }

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

        const messageChunks = Util.splitMessage(msg);

        if (typeof messageChunks === "object") {
            messageChunks.forEach((chunk) => {
                emojiListChannel.send(chunk);
            });
        } else {
            emojiListChannel.send(messageChunks);
        }
    }
}
