import * as log from "fancy-log";
import * as schedule from "node-schedule";
import * as snekfetch from "snekfetch";

import { Properties } from "../Properties";

export class ReportPrometheus {
    public static async run() {
        return schedule.scheduleJob("*/1 * * * *", async () => {
            const props = Properties.getInstance();
            const data = `bot_messages ${props.messages}
bot_guilds ${props.client.guilds.size}
bot_channels ${props.client.channels.size}
`;
            props.messages = 0;
            try {
                await snekfetch.put(`${props.config.config.pushGateway}/metrics/jobs/bots/instances/emojibot`, {
                    data,
                });
            } catch (e) {
                log.error(e);
            }
        });
    }
}
