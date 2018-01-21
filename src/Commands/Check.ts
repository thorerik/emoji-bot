import { Message, Permissions } from "discord.js";

import * as log from "fancy-log";

import { GuildConfiguration } from "../Database/Models/GuildConfiguration";
import { Command } from "../Lib/Command";
import { Properties } from "../Lib/Properties";

export class Check implements Command {
    // tslint:disable-next-line:max-line-length
    public help = "Various check commands";
    public examples = [
        "check sanity",
    ];
    public permissionRequired = "BOT_OWNER";

    public async run(message: Message, args: string[]) {
        const props = Properties.getInstance();
        if (args.shift() === "sanity") {
            await props.client.guilds.array().forEach(async (guild) => {
                let msg = "";
                const guildConfiguration = await GuildConfiguration.findOne({where: {guildID: guild.id.toString()}});
                if (guildConfiguration) {
                    msg += `${guild.name} (${guild.id}) OK`;
                    msg += "\n";
                } else {
                    msg += `${guild.name} (${guild.id}) Not OK`;
                    msg += "\n";
                }
                log(msg);
            });
        }
    }
}
