import { Message } from "discord.js";

export class Commands {
    public Class: string;

    constructor(public command: string) {
        // Construct the class name for use when loading the right command
        this.Class = command.charAt(0).toUpperCase() + command.slice(1);
    }

    public async execute(message: Message, args: string[]) {
        const cmd = `../Commands/${this.Class}`;

        // Ensure we reload the command on each execution
        delete require.cache[require.resolve(cmd)];

        const command = require(cmd);

        const ins = new command[this.Class]();

        await ins.run(message, args);
    }
}
