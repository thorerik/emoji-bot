"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Properties {
    constructor() {
        if (Properties.instance) {
            throw new Error("Error: Instantiation failed: Use Properties.getInstance() instead of new.");
        }
        Properties.instance = this;
    }
    static getInstance() {
        return Properties.instance;
    }
    getLogWebhookInstance() {
        if (!this.logWH) {
            this.logWH = new discord_js_1.WebhookClient(this.config.config.webhooks.logs.id, this.config.config.webhooks.logs.token);
        }
        return this.logWH;
    }
}
Properties.instance = new Properties();
exports.Properties = Properties;
