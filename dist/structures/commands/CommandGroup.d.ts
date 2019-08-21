import { Collection } from "discord.js";
import { Command } from "./Command";
export interface GroupTree {
    commands: Command[];
    groups?: GroupTree[];
    name: string;
}
export declare const withGroup: (groupName: string, ...cmdsOrSubGroups: (Command<any> | CommandGroup)[]) => CommandGroup;
export declare class CommandGroup {
    commands: Collection<string, Command<any>>;
    subGroups: Collection<string, CommandGroup>;
    commandAliasMap: Collection<string, string>;
    groupAliasMap: Collection<string, string>;
    commandIncrement: number;
    groupIncrement: number;
    name: string;
    aliases: string[];
    constructor(name: string, ...aliases: string[]);
    /**
     * Specifically add commands to the group
     * @param cmds Commands to add
     */
    addCommand(...cmds: Array<Command<any>>): void;
    /**
     * Specifically add groups to the group
     * @param groups Groups to add
     */
    addGroup(...groups: CommandGroup[]): void;
    /**
     * Adds commands & groups to the group
     * @param cmdsOrGroups Commands/groups to add
     */
    add(...cmdsOrGroups: Array<Command<any> | CommandGroup>): this;
    /**
     * Dynamically remove a command from the group
     * @param cmds Command to remove
     */
    removeCommand(...cmds: Array<Command<any> | string>): void;
    /**
     * Finds a given command by iterating through the group and subgroups
     * @param commandName Name of the command to find
     */
    find(commandName: string): Command<any> | undefined;
    /**
     * Find a command in a specific group by iterating through the group and specified subgroups
     * @param groupName Name of the group
     * @param command Name of the command
     */
    findInGroup(groupName: string[], command: string): Command<any> | undefined;
    /**
     * Gets the depth of the last group that matches the given group names
     * @param groupNames
     * @param index
     */
    getDeepestGroup(groupNames: string[], index?: number): number;
    /**
     * Looks for a command in the group and returns it, along with the depth of the command
     * @param args Arguments to look for commands in
     * @param index Current index
     */
    findFromArgs(args: string[], depth?: number): [Command<any>, number] | undefined;
    /**
     * Checks whether the group has an alias
     * @param name
     */
    alias(name: string): boolean;
    /**
     * Defines a group alias
     * @param alias
     */
    defAlias(alias: string): this;
    /**
     * Fetch the command tree
     */
    fetchCommandTree(): GroupTree;
}
