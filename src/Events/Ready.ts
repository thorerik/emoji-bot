import * as log from "fancy-log";

import { EventBase } from "../Lib/EventBase";

export class Ready extends EventBase {
    public subscribe = "ready";
    constructor() {
        super();
    }
    public run() {
        log(
            `${
                this.props.client.user.username
            } - (${
                this.props.client.user.id
            }) on ${
                this.props.client.guilds.size.toString()
            } guilds with ${
                this.props.client.channels.size.toString()
            } channels`,
        );
    }
}
