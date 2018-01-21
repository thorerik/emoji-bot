"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GuildConfiguration_1 = require("../Database/Models/GuildConfiguration");
const EventBase_1 = require("../Lib/EventBase");
class CommandProcessor extends EventBase_1.EventBase {
    constructor() {
        super();
    }
    async run(message) {
        this.message = message;
        if (this.message.guild === null) {
            return;
        }
        const guildConfiguration = await GuildConfiguration_1.GuildConfiguration.findOne({ where: { guildID: message.guild.id.toString() } });
        if (guildConfiguration.settings === null) {
            throw new Error(`Settings is null for ${message.guild.id}`);
        }
        const guildConfig = JSON.parse(guildConfiguration.settings);
        if (!this.message.content.startsWith(guildConfig.prefix)) {
            return;
        }
        this.args = this.message.content.split(/\s+/g);
        let command = this.args.shift().toLowerCase();
        command = command.split(guildConfig.prefix)[1];
        this.runCommand(command);
    }
    runCommand(command) {
        try {
            const cmd = this.props.getCommand(command);
            if (
            // User has permission
            (typeof cmd.permissionRequired !== "string" &&
                this.message.member.hasPermission(cmd.permissionRequired)) ||
                // User is owner
                (typeof cmd.permissionRequired === "string" &&
                    cmd.permissionRequired === "BOT_OWNER" &&
                    this.props.config.config.owners.includes(this.message.member.id))) {
                cmd.run(this.message, this.args);
            }
            else {
                this.message.reply(`Sorry, you do not have permission for this command`);
            }
        }
        catch (e) {
            // We don't really care for errors here
        }
    }
}
exports.CommandProcessor = CommandProcessor;
