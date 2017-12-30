"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Commands {
    constructor(command) {
        this.command = command;
        // Construct the class name for use when loading the right command
        this.Class = command.charAt(0).toUpperCase() + command.slice(1);
    }
    async execute(message, args) {
        const cmd = `../Commands/${this.Class}`;
        // Ensure we reload the command on each execution
        delete require.cache[require.resolve(cmd)];
        const command = require(cmd);
        const ins = new command[this.Class]();
        await ins.run(message, args);
    }
}
exports.Commands = Commands;
