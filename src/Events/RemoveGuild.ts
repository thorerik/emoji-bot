import * as log from "fancy-log";

import { Guild } from "discord.js";

import { GuildConfiguration } from "../Database/Models/GuildConfiguration";
import { EventBase } from "../Lib/EventBase";
import { LogError } from "../Lib/LogError";

export class RemoveGuild extends EventBase {
    public subscribe = "guildDelete";
    private logger = new LogError();

    constructor() {
        super();
    }

    public async run(guild: Guild) {
        log(`Guild gone: ${guild.name}, owned by ${guild.owner.user.username}#${guild.owner.user.discriminator}`);
        GuildConfiguration.destroy({where: {guildID: guild.id.toString()}});
    }
}
