"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const Properties_1 = require("./Properties");
class LogError {
    constructor() {
        this.props = Properties_1.Properties.getInstance();
    }
    /**
     * Log
     */
    async Log(error) {
        const webhookContent = {
            content: `:x: ** ERROR **`,
            embeds: [{
                    color: "RED",
                    fields: [
                        { name: "Exception", value: error.message, inline: false },
                        { name: "Stack", value: error.stack, inline: false },
                    ],
                    title: moment().format("ddd, Do of MMM @ HH:mm:ss"),
                }],
        };
        await this.props.getLogWebhookInstance().send(webhookContent);
    }
}
exports.LogError = LogError;
