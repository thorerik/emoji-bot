import * as log from "fancy-log";
import * as yaml from "js-yaml";
import * as snekfetch from "snekfetch";

import { Guild, GuildChannel, Message, PermissionOverwrites, Permissions, TextChannel } from "discord.js";
import { Command } from "../Lib/Command";
import { Properties } from "../Lib/Properties";

export class Emoji implements Command {
    // tslint:disable-next-line:max-line-length
    public help = "imports or deletes emojis";
    public examples = [
        "emoji add https://i.imgur.com/XrMnbMr.png bitcoin | add emoji with name bitcoin from url",
        "emoji add 398095372217745409 bitcoin | if someone has reacted with the emoji on message",
        "emoji delete bitcoin | delete emoji called bitcoin",
        "emoji edit bitcoin name bitcoin2 | rename bitcoin to bitcoin2",
        // tslint:disable-next-line:max-line-length
        "emoji bulk https://raw.githubusercontent.com/lambtron/emojipacks/master/packs/slackmojis-logo.yaml | import slackmoji compatible yaml",
    ];
    public permissionRequired = Permissions.FLAGS.MANAGE_EMOJIS;

    private message: Message;
    private guild: Guild;

    private props: Properties;

    constructor() {
        this.props = Properties.getInstance();
    }

    public async run(message: Message, args: string[]) {
        this.message = message;
        this.guild = this.message.guild;
        const subCommand = args.shift();

        if (subCommand === "add") {
            await this.add(args);
        } else if (subCommand === "delete") {
            await this.delete(args);
        } else if (subCommand === "edit") {
            await this.edit(args);
        } else if (subCommand === "bulk") {
            await this.bulk(args);
        } else {
            // tslint:disable-next-line:max-line-length
            await message.reply(`I don't understand what you mean, check \`${this.props.config.config.prefix}help emoji\` for help`);
        }
    }

    private async add(args: string[]) {
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
            emoji = await this.guild.emojis.create(url, name);
            this.message.reply(`Emoji created: ${emoji}`);
        } catch (e) {
            this.message.reply(`Failed to create emoji: ${e}`);
            log.error(e);
            throw e;
        }
    }

    private async delete(args: string[]) {
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

    private async edit(args: string[]) {
        const name = args.shift();
        const param = args.shift();
        const newValue = args.shift();
        const emoji = await this.guild.emojis.find("name", name);
        if (!emoji) {
            await this.message.reply(`Couldn't find ${name}`);
            return;
        }
        try {
            await emoji.edit({ [param]: newValue});
            await this.message.reply(`Edited ${emoji}: set ${param} to ${newValue}`);
        } catch (e) {
            await this.message.reply(`Failed to edit emoji ${name}: ${e}`);
        }
    }

    private async bulk(args: string[]) {
        const url = args.shift();
        try {
            const data = await snekfetch.get(url);

            const parsed = yaml.safeLoad(data.body);

            parsed.emojis.forEach(async (element) => {
                try {
                    if (this.guild.emojis.size < 50) {
                        await this.guild.emojis.create(element.src, element.name);
                    } else {
                        await this.message.channel.send(`Unable to add ${element.name}: ${element.src}, limit reached`);
                    }
                } catch (e) {
                    log.error(e);
                    throw e;
                }
            });

            this.message.reply("Imported");
        } catch (e) {
            log.error(e);
            throw e;
        }
    }
}
