import * as log from "fancy-log";

import { EventBase } from "../Lib/EventBase";
import { Properties } from "../Lib/Properties";

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
        const props = Properties.getInstance();
        props.verifyDatabase();
    }
}
