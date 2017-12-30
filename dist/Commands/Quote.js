"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Color_1 = require("../Lib/Color");
const Maths_1 = require("../Lib/Maths");
class Quote {
    async run(message, args) {
        // Get user, if any.
        let user = { name: null, avatar: null };
        let color = parseInt(Color_1.Color.hslToRgb(Maths_1.randomFloat(0, 1), Maths_1.randomFloat(0, 1), Maths_1.randomFloat(0, 1)), 16);
        if (/user/.test(args[0])) {
            // Discard the user portion of the message
            args.shift();
            const isUser = message.mentions.members.first();
            if (isUser) {
                // Discard the mention
                args.shift();
                color = isUser.displayColor;
                user = {
                    avatar: isUser.user.avatarURL,
                    name: `${isUser.user.username}#${isUser.user.discriminator}`,
                };
            }
            else {
                user = {
                    avatar: message.author.avatarURL,
                    name: `${message.author.username}#${message.author.discriminator}`,
                };
            }
        }
        const embed = new discord_js_1.MessageEmbed({
            author: { name: user.name, icon_url: user.avatar },
            color,
            description: args.join(" "),
        });
        // Send msg
        await message.edit("", embed);
    }
}
exports.Quote = Quote;
