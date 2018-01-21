import { Message, Permissions } from "discord.js";

import * as log from "fancy-log";

import { GuildConfiguration } from "../Database/Models/GuildConfiguration";
import { Command } from "../Lib/Command";
import { Properties } from "../Lib/Properties";

export class Help implements Command {
    public help = "Gets you the help text";
    public examples = [
        "help",
        "help ping",
    ];
    public permissionRequired = Permissions.FLAGS.SEND_MESSAGES;
    private props = Properties.getInstance();

    public async run(message: Message, args: string[]) {
        const guildConfiguration = await GuildConfiguration.findOne({where: {guildID: message.guild.id.toString()}});
        const guildConfig = JSON.parse(guildConfiguration.settings);
        const commands = this.props.getCommands();
        const prefix = guildConfig.prefix;

        let reply = "```";

        const arg = args.shift();

        if (arg) {
            const command = commands.get(arg);
            if (!command) {
                message.reply(`Unkown command, see \`${prefix}help\` for list of commands`);
                return;
            }
            reply += `Help for ${arg}\n\n`;
            reply += command.help + "\n\n";
            command.examples.forEach((example) => {
                reply += `${prefix}${example}`;
                reply += "\n";
            });
        } else {
            reply += "Help\n\n";
            reply += "Commands available: \n\n";
            commands.filter((command) => {
                return (
                    // User has permission
                    typeof command.permissionRequired !== "string" &&
                    message.member.hasPermission(command.permissionRequired)) ||
                    // User is owner
                    (
                        typeof command.permissionRequired === "string" &&
                        command.permissionRequired === "BOT_OWNER" &&
                        this.props.config.config.owners.includes(message.member.id)
                    );
            }).forEach((command) => {
                reply += `${prefix}${command.constructor.name.toLowerCase()}`;
                reply += "\n";
            });
        }
        reply += "```";
        message.channel.send(reply);
    }
}
