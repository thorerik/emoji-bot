import { Message, TextChannel } from "discord.js";

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

        const msg = await emojiListChannel.guild.emojis.map((e) => `${e} \`\`:${e.name}:\`\`\n`);

        emojiListChannel.send(msg);
    }
}
