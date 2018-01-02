"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("fancy-log");
const EventBase_1 = require("../Lib/EventBase");
class Ready extends EventBase_1.EventBase {
    constructor() {
        super();
        this.subscribe = "ready";
    }
    run() {
        log(`${this.props.client.user.username} - (${this.props.client.user.id}) on ${this.props.client.guilds.size.toString()} guilds with ${this.props.client.channels.size.toString()} channels`);
    }
}
exports.Ready = Ready;
