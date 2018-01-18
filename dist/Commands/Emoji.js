"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("fancy-log");
const yaml = require("js-yaml");
const snekfetch = require("snekfetch");
const discord_js_1 = require("discord.js");
const Properties_1 = require("../Lib/Properties");
class Emoji {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.help = "imports or deletes emojis";
        this.examples = [
            "emoji add https://i.imgur.com/XrMnbMr.png bitcoin | add emoji with name bitcoin from url",
            "emoji add 398095372217745409 bitcoin | if someone has reacted with the emoji on message",
            "emoji delete bitcoin | delete emoji called bitcoin",
            "emoji edit bitcoin name bitcoin2 | rename bitcoin to bitcoin2",
            // tslint:disable-next-line:max-line-length
            "emoji bulk https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/slackmojis-logo.yaml | import slackmoji compatible yaml",
        ];
        this.permissionRequired = discord_js_1.Permissions.FLAGS.MANAGE_EMOJIS;
        this.props = Properties_1.Properties.getInstance();
    }
    async run(message, args) {
        this.message = message;
        this.guild = this.message.guild;
        const subCommand = args.shift();
        if (subCommand === "add") {
            await this.add(args);
        }
        else if (subCommand === "delete") {
            await this.delete(args);
        }
        else if (subCommand === "edit") {
            await this.edit(args);
        }
        else if (subCommand === "bulk") {
            await this.bulk(args);
        }
        else {
            // tslint:disable-next-line:max-line-length
            await message.reply(`I don't understand what you mean, check \`${this.props.config.config.prefix}help emoji\` for help`);
        }
    }
    async add(args) {
        let url = args.shift();
        const name = args.shift();
        const maybeNumber = parseInt(url, 10);
        let emoji;
        try {
            if (maybeNumber) {
                const mentionedMessage = await this.message.channel.messages.fetch(url);
                mentionedMessage.reactions.forEach((reaction) => {
                    if (reaction.emoji.name === name) {
                        url = `https://cdn.discordapp.com/emojis/${reaction.emoji.id}.png`;
                    }
                });
            }
            emoji = await this.guild.createEmoji(url, name);
            this.message.reply(`Emoji created: ${emoji}`);
        }
        catch (e) {
            this.message.reply(`Failed to create emoji: ${e}`);
            log.error(e);
            throw e;
        }
    }
    async delete(args) {
        const name = args.shift();
        const emoji = await this.guild.emojis.find("name", name);
        if (!emoji) {
            await this.message.edit(`Couldn't find ${name}`);
            return;
        }
        emoji.delete().then((em) => {
            this.message.reply(`Successfully deleted ${name}`);
        }).catch((error) => {
            this.message.reply(`Failed to delete emoji ${name}: ${error}`);
        });
    }
    async edit(args) {
        const name = args.shift();
        const param = args.shift();
        const newValue = args.shift();
        const emoji = await this.guild.emojis.find("name", name);
        if (!emoji) {
            await this.message.reply(`Couldn't find ${name}`);
            return;
        }
        try {
            await emoji.edit({ [param]: newValue });
            await this.message.reply(`Edited ${emoji}: set ${param} to ${newValue}`);
        }
        catch (e) {
            await this.message.reply(`Failed to edit emoji ${name}: ${e}`);
        }
    }
    async bulk(args) {
        const url = args.shift();
        try {
            const data = await snekfetch.get(url);
            const parsed = yaml.safeLoad(data.body);
            parsed.emojis.forEach(async (element) => {
                try {
                    if (this.guild.emojis.size < 50) {
                        await this.guild.createEmoji(element.src, element.name);
                    }
                    else {
                        await this.message.channel.send(`Unable to add ${element.name}: ${element.src}, limit reached`);
                    }
                }
                catch (e) {
                    log.error(e);
                    throw e;
                }
            });
            this.message.reply("Imported");
        }
        catch (e) {
            log.error(e);
            throw e;
        }
    }
}
exports.Emoji = Emoji;
