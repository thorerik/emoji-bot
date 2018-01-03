import { Message } from "discord.js";
import { Command } from "../Lib/Command";

export class Purge implements Command {
    public help = "Purge all messages in channel";
    public examples = [
        "purge",
    ];
    public async run(message: Message, args: string[]) {
        const messages = await message.channel.messages.fetch();

        messages.forEach(async (msg) => {
            await msg.delete();
        });
    }
}
