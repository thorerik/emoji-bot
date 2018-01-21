import { Message } from "discord.js";
import * as log from "fancy-log";

import { GuildConfiguration } from "../Database/Models/GuildConfiguration";
import { EventBase } from "../Lib/EventBase";

export class CommandProcessor extends EventBase {
    constructor() {
        super();
    }
    public async run(message: Message) {
        const guildConfiguration = await GuildConfiguration.findOne({where: {guildID: message.guild.id.toString()}});
        const guildConfig = JSON.parse(guildConfiguration.settings);

        if (!message.content.startsWith(guildConfig.prefix)) { return; }

        const args = message.content.split(/\s+/g);
        let command = args.shift().toLowerCase();
        command = command.split(guildConfig.prefix)[1];
        try {
            const cmd = this.props.getCommand(command);
            if (
                // User has permission
                (typeof cmd.permissionRequired !== "string" && message.member.hasPermission(cmd.permissionRequired)) ||
                // User is owner
                (
                    typeof cmd.permissionRequired === "string" &&
                    cmd.permissionRequired === "BOT_OWNER" &&
                    this.props.config.config.owners.includes(message.member.id)
                )
            ) {
                cmd.run(message, args);
            } else {
                message.reply(`Sorry, you do not have permission for this command`);
            }
        } catch (e) {
            // We don't really care for errors here
        }
    }
}
