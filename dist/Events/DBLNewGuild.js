"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBL_1 = require("../Lib/DBL");
const EventBase_1 = require("../Lib/EventBase");
class DBLNewGuild extends EventBase_1.EventBase {
    constructor() {
        super();
        this.subscribe = "guildCreate";
    }
    async run(guild) {
        DBL_1.DBL.postStats();
    }
}
exports.DBLNewGuild = DBLNewGuild;
