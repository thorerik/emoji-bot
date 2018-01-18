"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GuildConfiguration_1 = require("../Database/Models/GuildConfiguration");
const EventBase_1 = require("../Lib/EventBase");
class CommandProcessor extends EventBase_1.EventBase {
    constructor() {
        super();
    }
    async run(message) {
        const guildConfiguration = await GuildConfiguration_1.GuildConfiguration.findOne({ where: { guildID: message.guild.id.toString() } });
        const guildConfig = JSON.parse(guildConfiguration.settings);
        if (!message.content.startsWith(guildConfig.prefix)) {
            return;
        }
        const args = message.content.split(/\s+/g);
        let command = args.shift().toLowerCase();
        command = command.split(guildConfig.prefix)[1];
        const cmd = this.props.getCommand(command);
        if (
        // User has permission
        (typeof cmd.permissionRequired !== "string" && message.member.hasPermission(cmd.permissionRequired)) ||
            // User is owner
            (typeof cmd.permissionRequired === "string" &&
                cmd.permissionRequired === "BOT_OWNER" &&
                this.props.config.config.owners.includes(message.member.id))) {
            cmd.run(message, args);
        }
        else {
            message.reply(`Sorry, you do not have permission for this command`);
        }
    }
}
exports.CommandProcessor = CommandProcessor;
