import { Message } from "discord.js";
import { FloofiClient } from "../../FloofiClient";
import { ParseableType, SyntaxParser } from "../../syntax/SyntaxParser";
import { SyntaxType } from "../../syntax/SyntaxType";
interface ExtraCommandOptions {
    aliases?: string[];
    guild?: string;
    help?: CommandHelp;
}
interface CommandHelp {
    description?: string;
}
interface CommandOptions {
    name: string;
    syntax: Array<SyntaxType<ParseableType>> | Array<Array<SyntaxType<ParseableType>>>;
    permissionLevel: number;
    aliases?: string[];
    guild?: string;
    help?: CommandHelp;
}
declare type Executor<ArgumentTypes extends ParseableType[] = []> = (client: FloofiClient, message: Message, args: ArgumentTypes) => any;
/**
 * Class for creating commands
 */
export declare class Command<ArgumentTypes extends ParseableType[] = []> {
    options: CommandOptions;
    executor: Executor<ArgumentTypes>;
    parser: SyntaxParser<ArgumentTypes>;
    constructor(name: string, syntax: string | string[], permissionLevel: number, executor: Executor<ArgumentTypes>, opts?: ExtraCommandOptions);
    /**
     * The name of the command
     */
    readonly name: string;
    /**
     * Runs the command
     * @param client The client
     * @param message The message to run the command with
     * @param depth The depth the command was called at
     */
    run(client: FloofiClient, message: Message, depth: number): Promise<Message | Message[] | undefined>;
    /**
     * Checks whether the given alias is an alias of the command
     * @param name
     */
    alias(alias: string): boolean;
    /**
     * Add a description to the command
     * @param description Description to use
     */
    withDescription(description: string): this;
}
export {};
