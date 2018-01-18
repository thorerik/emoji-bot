"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Properties_1 = require("../Lib/Properties");
class Eval {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.help = "Evaluates javascript";
        this.examples = [
            "eval message.reply('hi')",
        ];
        this.permissionRequired = "BOT_OWNER";
        this.props = Properties_1.Properties.getInstance();
    }
    async run(message, args) {
        if (args.length < 1) {
            return this.missingArgs(message);
        }
        const code = args.join(" ");
        try {
            // tslint:disable-next-line:no-eval
            const evaled = eval(code);
            this.successEmbed(message, code, evaled, "js");
        }
        catch (error) {
            this.errorEmbed(message, code, error, "js");
        }
    }
    successEmbed(message, input, output, inputType, outputType) {
        let embed = new discord_js_1.MessageEmbed();
        if (input !== null) {
            embed = embed
                .addField(":inbox_tray: Input", `\`\`\`${inputType}\n${input}\n\`\`\``);
        }
        embed = embed
            .addField(":outbox_tray: Output", `\`\`\`${outputType}\n${output}\n\`\`\``)
            .setColor(0x00FF00)
            .setTimestamp();
        message.channel.send({ embed });
    }
    errorEmbed(message, input, output, inputType, outputType) {
        let embed = new discord_js_1.MessageEmbed();
        if (input !== null) {
            embed = embed
                .addField(":inbox_tray: Input", `\`\`\`${inputType}\n${input}\n\`\`\``);
        }
        embed = embed
            .addField(":x: ERROR", `\`\`\`${outputType}\n${output}\n\`\`\``)
            .setColor(0xFF0000)
            .setTimestamp();
        message.channel.send({ embed });
    }
    missingArgs(message) {
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(":x: **ERROR**")
            .setDescription("Missing Arguments")
            .setColor(0xFF0000)
            .setTimestamp();
        message.channel.send({ embed });
    }
}
exports.Eval = Eval;
