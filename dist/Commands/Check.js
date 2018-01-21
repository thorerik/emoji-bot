"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("fancy-log");
const GuildConfiguration_1 = require("../Database/Models/GuildConfiguration");
const Properties_1 = require("../Lib/Properties");
class Check {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.help = "Various check commands";
        this.examples = [
            "check sanity",
        ];
        this.permissionRequired = "BOT_OWNER";
    }
    async run(message, args) {
        const props = Properties_1.Properties.getInstance();
        if (args.shift() === "sanity") {
            await props.client.guilds.array().forEach(async (guild) => {
                let msg = "";
                const guildConfiguration = await GuildConfiguration_1.GuildConfiguration.findOne({ where: { guildID: guild.id.toString() } });
                if (guildConfiguration) {
                    msg += `${guild.name} (${guild.id}) OK`;
                    msg += "\n";
                }
                else {
                    msg += `${guild.name} (${guild.id}) Not OK`;
                    msg += "\n";
                }
                log(msg);
            });
        }
    }
}
exports.Check = Check;
