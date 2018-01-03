"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Updatelist {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.help = "Updates emoji list in #emoji-list";
        this.examples = [
            "updatelist",
        ];
    }
    async run(message, args) {
        const emojiListChannel = await message.guild.channels.find("name", "emoji-list");
        if (!emojiListChannel) {
            return;
        }
        const messages = await emojiListChannel.messages.fetch();
        await messages.forEach(async (m) => {
            await m.delete();
        });
        let msg = "";
        await emojiListChannel.guild.emojis.forEach((e) => msg += `${e} \`\`:${e.name}:\`\`\n`);
        const messageChunks = discord_js_1.Util.splitMessage(msg);
        if (typeof messageChunks === "object") {
            messageChunks.forEach((chunk) => {
                emojiListChannel.send(chunk);
            });
        }
        else {
            emojiListChannel.send(messageChunks);
        }
    }
}
exports.Updatelist = Updatelist;
