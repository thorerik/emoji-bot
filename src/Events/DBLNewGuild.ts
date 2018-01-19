import * as log from "fancy-log";

import { Guild } from "discord.js";

import { DBL } from "../Lib/DBL";
import { EventBase } from "../Lib/EventBase";

export class DBLNewGuild extends EventBase {
    public subscribe = "guildCreate";

    constructor() {
        super();
    }

    public async run(guild: Guild) {
        DBL.postStats();
    }
}
