/// <reference path="../../../node_modules/discord.js/typings/index.d.ts" />
import { Collection } from "discord.js";
import { EventEmitter } from "events";
import { Logger } from "winston";
import { FloofiClient } from "../../client/FloofiClient";
import { SettingsProvider } from "../../client/SettingsProvider";
import { ClientEvents, ClientEventType } from "../../util/ClientEvents";
import { Command } from "../commands/Command";
import { CommandGroup } from "../commands/CommandGroup";
export declare type Listener = (...args: any[]) => any;
export declare type DefinedListener = [ClientEventType, ClientEvents[ClientEventType]];
export declare type PluginListener = (plugin: Plugin, client: FloofiClient) => any;
export declare const createPlugin: (name: string, ...props: (Command<any> | CommandGroup | [ClientEventType, ((channel: import("discord.js").Channel) => void) | ((channel: import("discord.js").Channel, time: Date) => void) | ((oldChannel: import("discord.js").Channel, newChannel: import("discord.js").Channel) => void) | ((clientUserGuildSettings: import("discord.js").ClientUserGuildSettings) => void) | ((clientUserSettings: import("discord.js").ClientUserSettings) => void) | ((info: string) => void) | ((event: any) => void) | ((emoji: import("discord.js").Emoji) => void) | ((emoji: import("discord.js").Emoji) => void) | ((oldEmoji: import("discord.js").Emoji, newEmoji: import("discord.js").Emoji) => void) | ((error: Error) => void) | ((guild: import("discord.js").Guild, user: import("discord.js").User) => void) | ((guild: import("discord.js").Guild, user: import("discord.js").User) => void) | ((guild: import("discord.js").Guild) => void) | ((guild: import("discord.js").Guild) => void) | ((member: import("discord.js").GuildMember) => void) | ((member: import("discord.js").GuildMember) => void) | ((member: import("discord.js").GuildMember) => void) | ((members: import("discord.js").GuildMember[], guild: import("discord.js").Guild) => void) | ((member: import("discord.js").GuildMember, speaking: boolean) => void) | ((oldMember: import("discord.js").GuildMember, newMember: import("discord.js").GuildMember) => void) | ((guild: import("discord.js").Guild) => void) | ((oldGuild: import("discord.js").Guild, newGuild: import("discord.js").Guild) => void) | ((guild: import("discord.js").Guild) => void) | ((message: import("discord.js").Message) => void) | ((message: import("discord.js").Message) => void) | ((messages: Collection<string, import("discord.js").Message>) => void) | ((messageReaction: import("discord.js").MessageReaction, user: import("discord.js").User) => void) | ((messageReaction: import("discord.js").MessageReaction, user: import("discord.js").User) => void) | ((message: import("discord.js").Message) => void) | ((oldMessage: import("discord.js").Message, newMessage: import("discord.js").Message) => void) | ((oldMember: import("discord.js").GuildMember, newMember: import("discord.js").GuildMember) => void) | ((rateLimit: import("discord.js").RateLimitInfo) => void) | (() => void) | (() => void) | ((replayed: number) => void) | ((role: import("discord.js").Role) => void) | ((role: import("discord.js").Role) => void) | ((oldRole: import("discord.js").Role, newRole: import("discord.js").Role) => void) | ((channel: import("discord.js").Channel, user: import("discord.js").User) => void) | ((channel: import("discord.js").Channel, user: import("discord.js").User) => void) | ((user: import("discord.js").UserResolvable, oldNote: string, newNote: string) => void) | ((oldUser: import("discord.js").User, newUser: import("discord.js").User) => void) | ((oldMember: import("discord.js").GuildMember, newMember: import("discord.js").GuildMember) => void) | ((info: string) => void) | ((channel: import("discord.js").TextChannel) => void)] | PluginListener)[]) => (client: FloofiClient) => Plugin;
export declare class Plugin extends EventEmitter {
    client: FloofiClient;
    name: string;
    commands: Collection<string, Command<any>>;
    groups: Collection<string, CommandGroup>;
    clientListeners: DefinedListener[];
    logger: Logger;
    provider: SettingsProvider;
    _on: (event: string | symbol, listener: (...args: any[]) => void) => this;
    private started;
    constructor(client: FloofiClient, name: string);
    /**
     * Specifically adds commands to the plugin
     * @param cmds Commands to add
     */
    addCommand(...cmds: Array<Command<any>>): void;
    /**
     * Specifically adds groups to the plugin
     * @param groups Groups to add
     */
    addGroup(...groups: CommandGroup[]): void;
    /**
     * Add commands/groups to the plugin
     */
    add(...cmdsOrGroups: Array<Command<any> | CommandGroup | DefinedListener | PluginListener>): this;
    /**
     * Adds a removable event listener to the client
     * @param eventName
     * @param listener
     */
    on<EventName extends ClientEventType>(eventName: EventName, listener: ClientEvents[EventName]): this;
    /**
     * Forcibly stop the plugin
     */
    forceStop(): void;
    /**
     * Method for sending data between plugins
     * @param dest Destination plugin
     * @param data Data
     */
    sendMessage(dest: string, data: any): void;
}
