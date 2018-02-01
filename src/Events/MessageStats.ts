import * as log from "fancy-log";

import { Message } from "discord.js";

import { EventBase } from "../Lib/EventBase";

export class MessageStats extends EventBase {
    public subscribe = "message";

    constructor() {
        super();
    }

    public async run(message: Message) {
        this.props.messages += 1;
    }
}
