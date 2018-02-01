"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventBase_1 = require("../Lib/EventBase");
class MessageStats extends EventBase_1.EventBase {
    constructor() {
        super();
        this.subscribe = "message";
    }
    async run(message) {
        this.props.messages += 1;
    }
}
exports.MessageStats = MessageStats;
