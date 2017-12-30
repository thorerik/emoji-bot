"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const log = require("fancy-log");
const Commands_1 = require("./Lib/Commands");
const Config_1 = require("./Lib/Config");
const Properties_1 = require("./Lib/Properties");
const props = Properties_1.Properties.getInstance();
props.config = new Config_1.Config("../../config");
props.client = new discord_js_1.Client({
    disabledEvents: [
        "TYPING_START",
    ],
    sync: true,
});
props.client.on("ready", () => {
    log(`${props.client.user.username} - (${props.client.user.id}) on ${props.client.guilds.size.toString()} guilds with ${props.client.channels.size.toString()} channels`);
});
props.client.on("message", async (message) => {
    if (!props.config.config.owners.includes(message.author.id)) {
        return;
    }
    if (!message.content.startsWith(props.config.config.prefix)) {
        return;
    }
    const args = message.content.split(/\s+/g);
    let command = args.shift().toLowerCase();
    command = command.split(props.config.config.prefix)[1];
    const cmd = new Commands_1.Commands(command);
    cmd.execute(message, args);
});
props.client.login(props.config.config.token).catch((err) => {
    log.error(err);
});
