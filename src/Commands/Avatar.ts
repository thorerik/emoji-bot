import { Message } from "discord.js";

import * as log from "fancy-log";

import { Command } from "../Lib/Command";
import { Properties } from "../Lib/Properties";

export class Avatar implements Command {
    public async run(message: Message, args: string[]) {
        const props = Properties.getInstance();
        try {
            await props.client.user.setAvatar(args.shift());
            await message.reply(`Avatar changed`);
        } catch (e) {
            await message.reply(`Failed to set avatar`);
            log.error(e);
        }
    }
}
