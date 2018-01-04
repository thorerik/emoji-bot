"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const discord_js_1 = require("discord.js");
const log = require("fancy-log");
const Config_1 = require("./Lib/Config");
const Properties_1 = require("./Lib/Properties");
const props = Properties_1.Properties.getInstance();
props.config = new Config_1.Config("./config.json");
props.client = new discord_js_1.Client({
    disabledEvents: [
        "TYPING_START",
    ],
    sync: true,
});
// Register commands
props.registerCommands();
// Register events
fs_1.readdir(path_1.join(".", "./dist/Events/"), (error, files) => {
    if (error) {
        return log.error(error);
    }
    files.forEach((file) => {
        const eventFile = require(`${path_1.resolve(".")}/dist/Events/${file}`);
        const eventName = file.split(".")[0];
        const eventClass = new eventFile[eventName]();
        log(`Registered event ${eventName} on ${eventClass.subscribe}`);
        props.client.on(eventClass.subscribe, (...args) => eventClass.run(...args));
    });
});
props.client.login(props.config.config.token).catch((err) => {
    log.error(err);
});
