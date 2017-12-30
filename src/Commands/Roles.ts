import { Message } from "discord.js";
import { Command } from "../Lib/Command";
import { Properties } from "../Lib/Properties";

export class Roles implements Command {
    private props = Properties.getInstance();

    public async run(message: Message, args: string[]) {
        const guildID = args.shift();
        const guild = this.props.client.guilds.get(guildID);

        guild.roles.forEach((role) => {
            message.channel.send(`${role.name}: ${role.id}`);
        });
    }
}
