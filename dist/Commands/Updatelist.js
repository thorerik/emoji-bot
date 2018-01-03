"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        const msg = await emojiListChannel.guild.emojis.map((e) => `${e} \`\`:${e.name}:\`\`\n`);
        emojiListChannel.send(msg);
    }
}
exports.Updatelist = Updatelist;
