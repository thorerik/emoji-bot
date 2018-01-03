"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Properties_1 = require("../Lib/Properties");
class Help {
    constructor() {
        this.help = "Gets you the help text";
        this.examples = [
            "help",
            "help ping",
        ];
        this.props = Properties_1.Properties.getInstance();
    }
    async run(message, args) {
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
        }
        else {
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
exports.Help = Help;
