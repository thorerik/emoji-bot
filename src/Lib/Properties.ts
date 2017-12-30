import { Client, WebhookClient } from "discord.js";
import { Config } from "./Config";

export class Properties {

    public static getInstance(): Properties {
        return Properties.instance;
    }

    private static instance: Properties = new Properties();

    public client: Client;

    public config: Config;
    private logWH: WebhookClient;

    constructor() {
        if (Properties.instance) {
            throw new Error("Error: Instantiation failed: Use Properties.getInstance() instead of new.");
        }
        Properties.instance = this;
    }

    public getLogWebhookInstance(): WebhookClient {
        if (!this.logWH) {
            this.logWH = new WebhookClient(this.config.config.webhooks.logs.id, this.config.config.webhooks.logs.token);
        }
        return this.logWH;
    }
}
