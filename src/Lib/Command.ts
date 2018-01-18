import { Message, PermissionResolvable } from "discord.js";

export declare class Command {
    public help: string;
    public examples: string[];
    public permissionRequired: PermissionResolvable | string;
    public run(message: Message, args: string[]): void;
}
