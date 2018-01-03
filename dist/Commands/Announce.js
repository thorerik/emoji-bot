"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Color_1 = require("../Lib/Color");
const Maths_1 = require("../Lib/Maths");
class Announce {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.help = "Announces to <channel> and optionally tags [@group], making it mentionable first if necessary";
        this.examples = [
            "announce #announcements A super announcement",
            "announce #announcements subscriber A super announcement",
        ];
    }
    async run(message, args) {
        const channelId = args.shift().toLowerCase().replace(/<#(.+)>/g, "$1");
        const channel = message.guild.channels.get(channelId);
        const group = message.guild.roles.find((val) => val.name.toLowerCase() === args[0].toLowerCase());
        const color = parseInt(Color_1.Color.hslToRgb(Maths_1.randomFloat(0, 1), Maths_1.randomFloat(0, 1), Maths_1.randomFloat(0, 1)), 16);
        if (group) {
            args.shift();
            await group.setMentionable(true);
            const embed = new discord_js_1.MessageEmbed()
                .setDescription(args.join(" "))
                .setColor(color);
            await channel.send(group, { embed });
            await group.setMentionable(false);
        }
        else {
            const embed = new discord_js_1.MessageEmbed()
                .setDescription(args.join(" "))
                .setColor(color);
            await channel.send({ embed });
        }
    }
}
exports.Announce = Announce;
