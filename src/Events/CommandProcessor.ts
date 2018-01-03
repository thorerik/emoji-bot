import { Message } from "discord.js";

import { EventBase } from "../Lib/EventBase";

export class CommandProcessor extends EventBase {
    constructor() {
        super();
    }
    public async run(message: Message) {
        if (!this.props.config.config.owners.includes(message.author.id)) { return; }
        if (!message.content.startsWith(this.props.config.config.prefix)) { return; }

        const args = message.content.split(/\s+/g);
        let command = args.shift().toLowerCase();
        command = command.split(this.props.config.config.prefix)[1];

        const cmd = this.props.getCommand(command);
        cmd.run(message, args);
    }
}
