"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../Lib/Commands");
const EventBase_1 = require("../Lib/EventBase");
class CommandProcessor extends EventBase_1.EventBase {
    constructor() {
        super();
    }
    async run(message) {
        if (!this.props.config.config.owners.includes(message.author.id)) {
            return;
        }
        if (!message.content.startsWith(this.props.config.config.prefix)) {
            return;
        }
        const args = message.content.split(/\s+/g);
        let command = args.shift().toLowerCase();
        command = command.split(this.props.config.config.prefix)[1];
        const cmd = new Commands_1.Commands(command);
        cmd.execute(message, args);
    }
}
exports.CommandProcessor = CommandProcessor;
