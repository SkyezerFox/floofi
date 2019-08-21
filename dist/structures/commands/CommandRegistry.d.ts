import { Collection, Message, GuildMember } from "discord.js";
import { FloofiClient } from "../../client/FloofiClient";
import { Command } from "./Command";
import { CommandGroup, GroupTree } from "./CommandGroup";
export declare class CommandRegistry {
    client: FloofiClient;
    commands: Collection<string, Command<any>>;
    groups: Collection<string, CommandGroup>;
    options: {
        prefix: string;
    };
    commandAliasMap: Collection<string, string>;
    groupAliasMap: Collection<string, string>;
    constructor(client: FloofiClient, options: {
        prefix: string;
    });
    /**
     * Specifically adds commands the registry
     * @param cmds Commands to add
     */
    addCommand(...cmds: Array<Command<any>>): void;
    /**
     * Specifically adds groups to the registry
     * @param groups Groups to add
     */
    addGroup(...groups: CommandGroup[]): void;
    /**
     * Adds groups/commands to the registry
     */
    add(...cmdsOrGroups: Array<Command<any> | CommandGroup>): this;
    /**
     * Removes commands from the registry
     */
    removeCommand(...cmds: Array<Command<any> | string>): void;
    /**
     * Runs a command in the context of message
     * @param message Message to run command with
     * @param command Command to run
     */
    run(message: Message, command: Command<any>, depth: number): Promise<Message | Message[]> | undefined;
    /**
     * Attempts to find a matching command in a given message
     * @param message The message to search in
     */
    findCommandFromMessage(message: Message): Promise<[Command<any>, number] | undefined>;
    /**
     * Return the entire command tree in object form
     */
    fetchCommandObjectTree(): {
        commands: Command<any>[];
        groups: CommandGroup[];
    };
    /**
     * Return the entire command tree
     */
    fetchCommandTree(): {
        commands: Command<any>[];
        groups: GroupTree[];
    };
    /**
     * Create user-specific help data
     * @param member The member to create the help info for
     */
    createHelpData(member: GuildMember): Promise<void>;
}
