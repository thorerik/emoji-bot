"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schedule = require("node-schedule");
const snekfetch = require("snekfetch");
const Properties_1 = require("../Properties");
class ReportPrometheus {
    static async run() {
        return schedule.scheduleJob("*/1 * * * *", () => {
            const props = Properties_1.Properties.getInstance();
            const data = `bot_messages ${props.messages}
            bot_guilds ${props.client.guilds.size}
            bot_channels ${props.client.channels.size}`;
            snekfetch.put(`${props.config.config.pushGateway}/metrics/job/bots/instance/emojibot`, {
                data,
            });
        });
    }
}
exports.ReportPrometheus = ReportPrometheus;
