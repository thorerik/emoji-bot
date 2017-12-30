"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Purge {
    async run(message, args) {
        const messages = await message.channel.messages.fetch();
        messages.forEach(async (msg) => {
            await msg.delete();
        });
    }
}
exports.Purge = Purge;
