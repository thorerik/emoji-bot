import { Message, MessageEmbed, TextChannel } from "discord.js";
import * as moment from "moment";
import { Command } from "../Lib/Command";

const contentFilter = ['Content filter disabled', 'Scan messages of members without a role', 'Scan messages sent by all members']; // tslint:disable-line
const verificationLevel = ['None - unrestricted', 'Low - must have verified email on account', 'Medium - must be registered on Discord for longer than 5 minutes', 'High - 	(╯°□°）╯︵ ┻━┻ - must be a member of the server for longer than 10 minutes', 'Very High - ┻━┻ミヽ(ಠ益ಠ)ﾉ彡┻━┻ - must have a verified phone number']; // tslint:disable-line

export class Serverinfo implements Command {
    public async run(message: Message, args: string[]) {
        if (message.channel.type !== "text" && args[0] === "current") {
            return message.reply("Missing argument");
        }

        let guild;

        if (args[0] === "current") {
            guild = message.guild;
        } else {
           guild = message.client.guilds.get(args[0]);
           if (!guild) {
               return message.reply(`Couldn't find guild ${args[0]}`);
           }
        }

        const channels = guild.channels.map((ty) => ty.type);
        const presences = guild.presences.map((st) => st.status);
        const serverEmbed = new MessageEmbed();

        let guildChannels = 0;
        let onlineMembers = 0;

        for (const i in presences) {
            if (presences[i] !== "offline") {
                onlineMembers += 1;
            }
        }
        for (const i in channels) {
            if (channels[i] === "text") {
                guildChannels += 1;
            }
        }

        const guildMembers = await guild.members.fetch();

        serverEmbed
            .setColor(guild.owner.displayHexColor)
            .setAuthor("Server Info", "https://favna.s-ul.eu/O0qc0yt7.png")
            .setThumbnail(guild.iconURL())
            .setFooter(`Server ID: ${guild.id}`)
            .addField("Server Name", guild.name, true)
            .addField("Owner", guild.owner.user.tag, true)
            .addField("Members", guild.memberCount, true)
            .addField("Bots", guildMembers.filter((user) => user.user.bot).size)
            .addField("Currently Online", onlineMembers, true)
            .addField("Region", guild.region, true)
            .addField("Highest Role", guild.roles.sort((a, b) => a.position - b.position || a.id - b.id).last().name, true) // tslint:disable-line
            .addField("Number of emojis", guild.emojis.size, true)
            .addField("Number of roles", guild.roles.size, true)
            .addField("Number of channels", guildChannels, true)
            .addField("Created At", moment(guild.createdTimestamp).format("MMMM Do YYYY [@] HH:mm:ss [UTC]Z"), false)
            .addField("Verification Level", verificationLevel[guild.verificationLevel], false)
            .addField("Explicit Content Filter", contentFilter[`${guild.explicitContentFilter}`], false);

        guild.splashURL() !== null ? serverEmbed.setImage(guild.splashURL()) : null; // tslint:disable-line

        return message.edit({embed: serverEmbed});
    }
}
