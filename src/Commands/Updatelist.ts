import { Message, TextChannel, Util } from "discord.js";

import * as log from "fancy-log";

import { Command } from "../Lib/Command";
import { Properties } from "../Lib/Properties";

export class Updatelist implements Command {
    // tslint:disable-next-line:max-line-length
    public help = "Updates emoji list in #emoji-list";
    public examples = [
        "updatelist",
    ];

    public async run(message: Message, args: string[]) {
        const emojiListChannel = await message.guild.channels.find("name", "emoji-list") as TextChannel;
        if (!emojiListChannel) { return; }

        const messages = await emojiListChannel.messages.fetch();

        await messages.forEach(async (m) => {
            await m.delete();
        });

        let msg = "";
        await emojiListChannel.guild.emojis.forEach((e) => msg += `${e} \`\`:${e.name}:\`\`\n`);

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
