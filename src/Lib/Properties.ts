import { Client, Collection, WebhookClient } from "discord.js";

import { Command } from "./Command";
import { Config } from "./Config";

export class Properties {

    public static getInstance(): Properties {
        return Properties.instance;
    }

    private static instance: Properties = new Properties();

    public client: Client;

    public config: Config;
    private logWH: WebhookClient;
    private commands: Collection<string, Command>;

    constructor() {
        if (Properties.instance) {
            throw new Error("Error: Instantiation failed: Use Properties.getInstance() instead of new.");
        }
        Properties.instance = this;
        this.commands = new Collection<string, Command>();
    }

    public getLogWebhookInstance(): WebhookClient {
        if (!this.logWH) {
            this.logWH = new WebhookClient(this.config.config.webhooks.logs.id, this.config.config.webhooks.logs.token);
        }
        return this.logWH;
    }

    public setCommand(name: string, command: Command) {
        this.commands.set(name, command);
    }

    public getCommand(name: string): Command {
        return this.commands.get(name);
    }
}
