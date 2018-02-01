import * as schedule from "node-schedule";
import * as snekfetch from "snekfetch";

import { Properties } from "../Properties";

export class ReportPrometheus {
    public static async run() {
        return schedule.scheduleJob("*/1 * * * *", () => {
            const props = Properties.getInstance();
            const data = `bot_messages ${props.messages}
            bot_guilds ${props.client.guilds.size}
            bot_channels ${props.client.channels.size}`;
            console.log(data);
            snekfetch.put(`${props.config.config.pushGateway}/metrics/job/bots/instance/emojibot`, {
                data,
            });
        });
    }
}
