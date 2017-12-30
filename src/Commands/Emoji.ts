import * as log from "fancy-log";
import * as yaml from "js-yaml";
import * as snekfetch from "snekfetch";

import { Guild, Message, PermissionOverwrites, GuildChannel, TextChannel } from "discord.js";
import { Command } from "../Lib/Command";
import { Properties } from "../Lib/Properties";

export class Emoji implements Command {
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
        const arg1 = args.shift();
        const arg2 = args.shift();
        const arg3 = args.shift();

        switch (subCommand) {
            case "add":
                this.add(arg1, arg2);
                break;
            case "delete":
                this.delete(arg1);
                break;
            case "edit":
                this.edit(arg1, arg2, arg3);
                break;
            case "bulk":
                this.bulk(arg1);
                break;
            default:
                await message.edit(`Wrong usage? emoji add <url> <name> | <messageid> <name> or emoji delete <name>`);
        }
    }

    private async add(url: string, name: string) {
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
            this.message.edit(`Emoji created: ${emoji}`);
        } catch (e) {
            this.message.reply(`Failed to create emoji: ${e}`);
            log.error(e);
        }
    }

    private async delete(name: string) {
        const emoji = await this.guild.emojis.find("name", name);
        if (!emoji) {
            await this.message.edit(`Couldn't find ${name}`);
            return;
        }
        emoji.delete().then((em) => {
            this.message.edit(`Successfully deleted ${name}`);
        }).catch((error) => {
            this.message.edit(`Failed to delete emoji ${name}: ${error}`);
        });
    }

    private async edit(name: string, param: string, newValue: string) {
        const emoji = await this.guild.emojis.find("name", name);
        if (!emoji) {
            await this.message.edit(`Couldn't find ${name}`);
            return;
        }
        try {
            await emoji.edit({ [param]: newValue});
            await this.message.reply(`Edited ${emoji}: set ${param} to ${newValue}`);
        } catch (e) {
            await this.message.reply(`Failed to edit emoji ${name}: ${e}`);
        }
    }

    private async bulk(url: string) {
        try {
            const data = await snekfetch.get(url);

            const parsed = yaml.safeLoad(data.body);

            parsed.emojis.forEach(async (element) => {
                try {
                    if (this.guild.emojis.size < 50) {
                        await this.guild.createEmoji(element.src, element.name);
                    } else {
                        await this.message.channel.send(`Unable to add ${element.name}: ${element.src}, limit reached`);
                    }
                } catch (e) {
                    log.error(e);
                }
            });

            this.message.reply("Imported");
        } catch (e) {
            log.error(e);
        }
    }
}
