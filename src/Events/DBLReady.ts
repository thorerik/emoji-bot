import * as log from "fancy-log";

import { request } from "https";
import { stringify } from "querystring";

import { Guild } from "discord.js";

import { DBL } from "../Lib/DBL";
import { EventBase } from "../Lib/EventBase";

export class DBLReady extends EventBase {
    public subscribe = "ready";

    constructor() {
        super();
    }

    public async run(guild: Guild) {
        DBL.postStats();
    }
}
