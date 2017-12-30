"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ping {
    async run(message, args) {
        const me = await message.channel.send("Ping?");
        me.edit(`Pong! Latency is ${me.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ping)}ms`);
    }
}
exports.Ping = Ping;
