import { readdir } from "fs";
import { join, resolve } from "path";

import { Client, Collection, WebhookClient } from "discord.js";
import { ISequelizeUriConfig, Sequelize } from "sequelize-typescript";

import * as log from "fancy-log";

import { Command } from "./Command";
import { Config } from "./Config";

import { GuildConfiguration } from "../Database/Models/GuildConfiguration";

export class Properties {

    public static getInstance(): Properties {
        return Properties.instance;
    }

    private static instance: Properties = new Properties();

    public client: Client;

    public db: Sequelize;

    public config: Config;
    private logWH: WebhookClient;
    private commands: Collection<string, Command>;

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

    public setCommand(name: string, command: Command) {
        this.commands.set(name, command);
    }

    public getCommand(name: string): Command {
        return this.commands.get(name);
    }

    public getCommands(): Collection<string, Command> {
        return this.commands;
    }

    public registerCommands() {
        this.commands = new Collection<string, Command>();
        readdir(join(".", "./dist/Commands/"), (error, files) => {
            if (error) {
                log.error(error);
                throw error;
            }

            files.forEach((file) => {
                delete require.cache[require.resolve(`${resolve(".")}/dist/Commands/${file}`)];
                const commandFile = require(`${resolve(".")}/dist/Commands/${file}`);
                const commandName = file.split(".")[0];

                const commandClass = new commandFile[commandName]();

                log(`Registered command ${commandName}`);

                this.setCommand(commandName.toLowerCase(), commandClass);
            });
        });
    }

    public async setupDatabase() {
        this.db = new Sequelize({
            modelPaths: [join(resolve("."), "dist/Database/Models")],
            url: this.config.config.database.connectionString,
        } as ISequelizeUriConfig);

        await this.db.sync();
    }

    public async verifyDatabase() {
        this.client.guilds.forEach(async (guild) => {
            let guildConfiguration = await GuildConfiguration.findOne({where: {guildID: guild.id.toString()}});
            if (!guildConfiguration) {
                console.log(`Didn't find ${guild.name} in database, adding…`);
                guildConfiguration = new GuildConfiguration({
                    guildID: guild.id.toString(),
                    settings: JSON.stringify({prefix: "em!"}),
                });
                await guildConfiguration.save();
            }
        });
    }

    private deleteCommand(name: string) {
        this.commands.delete(name);
    }
}
