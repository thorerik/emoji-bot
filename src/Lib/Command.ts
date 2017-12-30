import { Message } from "discord.js";

export declare class Command {
    public run(message: Message, args: string[]): void;
}
