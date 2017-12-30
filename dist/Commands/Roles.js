"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Properties_1 = require("../Lib/Properties");
class Roles {
    constructor() {
        this.props = Properties_1.Properties.getInstance();
    }
    async run(message, args) {
        const guildID = args.shift();
        const guild = this.props.client.guilds.get(guildID);
        guild.roles.forEach((role) => {
            message.channel.send(`${role.name}: ${role.id}`);
        });
    }
}
exports.Roles = Roles;
