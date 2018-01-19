"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const GuildConfiguration_1 = require("../Database/Models/GuildConfiguration");
const Properties_1 = require("../Lib/Properties");
class Help {
    constructor() {
        this.help = "Gets you the help text";
        this.examples = [
            "help",
            "help ping",
        ];
        this.permissionRequired = discord_js_1.Permissions.FLAGS.SEND_MESSAGES;
        this.props = Properties_1.Properties.getInstance();
    }
    async run(message, args) {
        const guildConfiguration = await GuildConfiguration_1.GuildConfiguration.findOne({ where: { guildID: message.guild.id.toString() } });
        const guildConfig = JSON.parse(guildConfiguration.settings);
        const commands = this.props.getCommands();
        const prefix = guildConfig.prefix;
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
            commands.filter((command) => {
                return (
                // User has permission
                typeof command.permissionRequired !== "string" &&
                    message.member.hasPermission(command.permissionRequired)) ||
                    // User is owner
                    (typeof command.permissionRequired === "string" &&
                        command.permissionRequired === "BOT_OWNER" &&
                        this.props.config.config.owners.includes(message.member.id));
            }).forEach((command) => {
                reply += `${prefix}${command.constructor.name.toLowerCase()}`;
                reply += "\n";
            });
        }
        reply += "```";
        message.channel.send(reply);
    }
}
exports.Help = Help;
