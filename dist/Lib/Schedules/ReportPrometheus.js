"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("fancy-log");
const schedule = require("node-schedule");
const snekfetch = require("snekfetch");
const Properties_1 = require("../Properties");
class ReportPrometheus {
    static async run() {
        return schedule.scheduleJob("*/1 * * * *", async () => {
            const props = Properties_1.Properties.getInstance();
            const data = `bot_messages ${props.messages}
bot_guilds ${props.client.guilds.size}
bot_channels ${props.client.channels.size}
`;
            props.messages = 0;
            try {
                await snekfetch.put(`${props.config.config.pushGateway}/metrics/jobs/bots/instances/emojibot`, {
                    data,
                });
            }
            catch (e) {
                log.error(e);
            }
        });
    }
}
exports.ReportPrometheus = ReportPrometheus;
