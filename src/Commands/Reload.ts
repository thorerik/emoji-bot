import { Message } from "discord.js";

import * as log from "fancy-log";

import { Command } from "../Lib/Command";
import { Properties } from "../Lib/Properties";

export class Reload implements Command {
    private props = Properties.getInstance();

    public async run(message: Message, args: string[]) {
        log("Reloading commands");
        this.props.registerCommands();
        message.react("👍");
    }
}
