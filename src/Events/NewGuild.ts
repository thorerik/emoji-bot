import * as log from "fancy-log";

import { Guild } from "discord.js";

import { GuildConfiguration } from "../Database/Models/GuildConfiguration";
import { EventBase } from "../Lib/EventBase";
import { LogError } from "../Lib/LogError";

export class NewGuild extends EventBase {
    public subscribe = "guildCreate";
    private logger = new LogError();

    constructor() {
        super();
    }

    public async run(guild: Guild) {
        // tslint:disable-next-line:max-line-length
        log(`New guild: ${guild.name}, owned by ${guild.owner.user.username}#${guild.owner.user.discriminator} with ${guild.memberCount} members`);
        const guildConfiguration = new GuildConfiguration({
            guildID: guild.id.toString(),
            settings: JSON.stringify({prefix: "em!"}),
        });
        await guildConfiguration.save();
    }
}
