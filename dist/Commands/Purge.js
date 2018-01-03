"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Purge {
    constructor() {
        this.help = "Purge all messages in channel";
        this.examples = [
            "purge",
        ];
    }
    async run(message, args) {
        const messages = await message.channel.messages.fetch();
        messages.forEach(async (msg) => {
            await msg.delete();
        });
    }
}
exports.Purge = Purge;
