import { Message, MessageEmbed } from "discord.js";
import { Color } from "../Lib/Color";
import { Command } from "../Lib/Command";
import { randomFloat } from "../Lib/Maths";

export class Quote implements Command {
    public async run(message: Message, args: string[]) {
        // Get user, if any.
        let user = { name: null, avatar: null };
        let color = parseInt(
            Color.hslToRgb(
                randomFloat(0, 1),
                randomFloat(0, 1),
                randomFloat(0, 1),
            ),
            16,
        );

        if (/user/.test(args[0])) {
            // Discard the user portion of the message
            args.shift();
            const isUser = message.mentions.members.first();
            if (isUser) {
                // Discard the mention
                args.shift();
                color = isUser.displayColor;
                user = {
                    avatar: isUser.user.avatarURL,
                    name: `${isUser.user.username}#${isUser.user.discriminator}`,
                };
            } else {
                user = {
                    avatar: message.author.avatarURL,
                    name: `${message.author.username}#${message.author.discriminator}`,
                };
            }
        }

        const embed = new MessageEmbed({
            author: { name: user.name, icon_url: user.avatar },
            color,
            description: args.join(" "),
        });
        // Send msg
        await message.edit("", embed);
    }
}
