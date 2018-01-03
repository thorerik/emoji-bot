"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const discord_js_1 = require("discord.js");
const log = require("fancy-log");
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
    setCommand(name, command) {
        this.commands.set(name, command);
    }
    getCommand(name) {
        return this.commands.get(name);
    }
    registerCommands() {
        this.commands = new discord_js_1.Collection();
        fs_1.readdir(path_1.join(".", "./dist/Commands/"), (error, files) => {
            if (error) {
                return log.error(error);
            }
            files.forEach((file) => {
                delete require.cache[require.resolve(`${path_1.resolve(".")}/dist/Commands/${file}`)];
                const commandFile = require(`${path_1.resolve(".")}/dist/Commands/${file}`);
                const commandName = file.split(".")[0];
                const commandClass = new commandFile[commandName]();
                log(`Registered command ${commandName}`);
                this.setCommand(commandName.toLowerCase(), commandClass);
            });
        });
    }
    deleteCommand(name) {
        this.commands.delete(name);
    }
}
Properties.instance = new Properties();
exports.Properties = Properties;
