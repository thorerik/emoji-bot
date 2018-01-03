import { readdir } from "fs";
import { join, resolve } from "path";

import { Client, Message } from "discord.js";

import * as log from "fancy-log";

import { Config } from "./Lib/Config";
import { Properties } from "./Lib/Properties";

const props = Properties.getInstance();
props.config = new Config("../../config");
props.client = new Client({
    disabledEvents: [
        "TYPING_START",
    ],
    sync: true,
});

// Register commands
readdir(join(".", "./dist/Commands/"), (error, files) => {
    if (error) {
        return log.error(error);
    }

    files.forEach((file) => {
        const commandFile = require(`${resolve(".")}/dist/Commands/${file}`);
        const commandName = file.split(".")[0];

        const commandClass = new commandFile[commandName]();

        log(`Registered command ${commandName}`);

        props.setCommand(commandName.toLowerCase(), commandClass);
    });
});

// Register events
readdir(join(".", "./dist/Events/"), (error, files) => {
    if (error) {
        return log.error(error);
    }

    files.forEach((file) => {
        const eventFile = require(`${resolve(".")}/dist/Events/${file}`);
        const eventName = file.split(".")[0];

        const eventClass = new eventFile[eventName]();

        log(`Registered event ${eventName} on ${eventClass.subscribe}`);

        props.client.on(
            eventClass.subscribe,
            (...args) => eventClass.run(...args),
        );
    });
});

props.client.login(props.config.config.token).catch((err) => {
    log.error(err);
});
