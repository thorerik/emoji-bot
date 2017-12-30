import { Message, MessageEmbed, TextChannel } from "discord.js";
import { Color } from "../Lib/Color";
import { Command } from "../Lib/Command";
import { randomFloat } from "../Lib/Maths";

export class Announce implements Command {
    public async run(message: Message, args: string[]) {
        const channelId = args.shift().toLowerCase().replace(/<#(.+)>/g, "$1");
        const channel = message.guild.channels.get(channelId) as TextChannel;

        const group = message.guild.roles.find((val) => val.name.toLowerCase() === args[0].toLowerCase());

        const color = parseInt(
            Color.hslToRgb(
                randomFloat(0, 1),
                randomFloat(0, 1),
                randomFloat(0, 1),
            ),
            16,
        );

        if (group) {
            args.shift();
            await group.setMentionable(true);

            const embed = new MessageEmbed()
                .setDescription(args.join(" "))
                .setColor(color);
            await channel.send(group, { embed });

            await group.setMentionable(false);
        } else {
            const embed = new MessageEmbed()
                .setDescription(args.join(" "))
                .setColor(color);
            await channel.send({ embed });
        }

    }
}
