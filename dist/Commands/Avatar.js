"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("fancy-log");
const Properties_1 = require("../Lib/Properties");
class Avatar {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.help = "Sets avatar of the bot to <link>";
        this.examples = [
            "avatar <link>",
        ];
    }
    async run(message, args) {
        const props = Properties_1.Properties.getInstance();
        try {
            await props.client.user.setAvatar(args.shift());
            await message.reply(`Avatar changed`);
        }
        catch (e) {
            await message.reply(`Failed to set avatar`);
            log.error(e);
        }
    }
}
exports.Avatar = Avatar;
