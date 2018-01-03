import { Message } from "discord.js";

export declare class Command {
    public help: string;
    public examples: string[];
    public run(message: Message, args: string[]): void;
}
