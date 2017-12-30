import { Client, Message } from "discord.js";

import * as log from "fancy-log";

import { Commands } from "./Lib/Commands";
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

props.client.on("ready", () => {
  log(
      `${
            props.client.user.username
        } - (${
            props.client.user.id
        }) on ${
            props.client.guilds.size.toString()
        } guilds with ${
            props.client.channels.size.toString()
        } channels`,
  );
});

props.client.on("message", async (message: Message) => {
    if (!props.config.config.owners.includes(message.author.id)) { return; }
    if (!message.content.startsWith(props.config.config.prefix)) { return; }

    const args = message.content.split(/\s+/g);
    let command = args.shift().toLowerCase();
    command = command.split(props.config.config.prefix)[1];

    const cmd = new Commands(command);
    cmd.execute(message, args);
});

props.client.login(props.config.config.token).catch((err) => {
    log.error(err);
});
