"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("fancy-log");
const Properties_1 = require("../Lib/Properties");
class Reload {
    constructor() {
        this.help = "Reloads all commands in the bot";
        this.examples = [
            "reload",
        ];
        this.permissionRequired = "BOT_OWNER";
        this.props = Properties_1.Properties.getInstance();
    }
    async run(message, args) {
        log("Reloading commands");
        this.props.registerCommands();
        message.react("👍");
    }
}
exports.Reload = Reload;
