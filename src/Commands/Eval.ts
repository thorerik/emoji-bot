import { Message, MessageEmbed, TextChannel, Util } from "discord.js";

import * as log from "fancy-log";

import { Command } from "../Lib/Command";
import { Properties } from "../Lib/Properties";

export class Eval implements Command {
    // tslint:disable-next-line:max-line-length
    public help = "Evaluates javascript";
    public examples = [
        "eval message.reply('hi')",
    ];

    private props = Properties.getInstance();

    public async run(message: Message, args: string[]) {
        if (args.length < 1) { return this.missingArgs(message); }

        const code = args.join(" ");

        try {
            // tslint:disable-next-line:no-eval
            const evaled = eval(code);

            this.successEmbed(message, code, evaled, "js");
        } catch (error) {
            this.errorEmbed(message, code, error, "js");
        }
    }

    private successEmbed(message: Message, input: string, output: string, inputType?: string, outputType?: string) {

        let embed = new MessageEmbed();

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

    private errorEmbed(message: Message, input: string, output: string, inputType?: string, outputType?: string) {

        let embed = new MessageEmbed();

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

    private missingArgs(message: Message) {
        const embed = new MessageEmbed()
            .setTitle(":x: **ERROR**")
            .setDescription("Missing Arguments")
            .setColor(0xFF0000)
            .setTimestamp();

        message.channel.send({ embed });
    }
}
