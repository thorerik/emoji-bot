import { Message } from "discord.js";

import * as log from "fancy-log";

import { Command } from "../Lib/Command";
import { Properties } from "../Lib/Properties";

export class Reload implements Command {
    public help = "Reloads all commands in the bot";
    public examples = [
        "reload",
    ];
    public permissionRequired = "BOT_OWNER";
    private props = Properties.getInstance();

    public async run(message: Message, args: string[]) {
        log("Reloading commands");
        this.props.registerCommands();
        message.react("👍");
    }
}
