import { Message } from "discord.js";

import * as log from "fancy-log";

import { Command } from "../Lib/Command";
import { Properties } from "../Lib/Properties";

export class Help implements Command {
    public help = "Gets you the help text";
    public examples = [
        "help",
        "help ping",
    ];
    private props = Properties.getInstance();

    public async run(message: Message, args: string[]) {
        const commands = this.props.getCommands();
        const prefix = this.props.config.config.prefix;

        let reply = "```";

        const arg = args.shift();

        if (arg) {
            const command = commands.get(arg);
            reply += `Help for ${arg}\n\n`;
            reply += command.help + "\n\n";
            command.examples.forEach((example) => {
                reply += `${prefix}${example}`;
                reply += "\n";
            });
        } else {
            reply += "Help\n\n";
            reply += "Commands available: \n\n";
            commands.forEach((command) => {
                reply += `${prefix}${command.constructor.name.toLowerCase()}`;
                reply += "\n";
            });
        }
        reply += "```";
        message.channel.send(reply);
    }
}
