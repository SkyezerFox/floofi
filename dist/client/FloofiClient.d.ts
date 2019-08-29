import { Client, ClientOptions } from "discord.js";
import * as winston from "winston";
import { Command } from "../structures/commands/Command";
import { CommandGroup } from "../structures/commands/CommandGroup";
import { CommandRegistry } from "../structures/commands/CommandRegistry";
import { PluginManager, PluginManagerOptions } from "../structures/plugins/PluginManager";
import { SettingsProvider, SettingsProviderOptions } from "./SettingsProvider";
/**
 * FloofiClientOptions
 *
 * @typedef
 * @property {string} [debug] - Whether to log debug info
 * @property {string} [name="username"] - Name of the bot
 * @property {boolean} offline - Whether or not the bot should start in offline mode
 * @property {Object} pluginOptions - Options for the PluginManager
 * @property {string} token - Token to use to connect to Discord
 */
interface FloofiClientOptions extends ClientOptions {
    debug?: "verbose" | "debug";
    name: string;
    offline: boolean;
    pluginOptions: PluginManagerOptions;
    token: string;
}
/**
 * Main client for interacting with Discord
 */
export declare class FloofiClient extends Client {
    options: FloofiClientOptions;
    registry: CommandRegistry;
    pluginManager: PluginManager;
    provider: SettingsProvider;
    logger: winston.Logger;
    add: (...commandsOrGroup: Array<Command<any> | CommandGroup>) => CommandRegistry;
    constructor(opts?: Partial<FloofiClientOptions>);
    /**
     * Log in to Discord
     * @param {string} [token] - Token to use while connecting to Discord, defaults to the one provided in options.
     * @param $number} [attempt=0] - Value used at runtime to determine how many times the login flow has been attempted - YOU SHOULDN'T USE THIS.
     */
    login(token?: string, attempt?: number): Promise<string>;
    /**
     * Set the SettingsProvider
     * @param {Function} provider - The constructor function of the provider to use
     * @param {*} opts - Options to parse to the provider at runtime
     */
    useProvider<Provider extends SettingsProvider, Options extends SettingsProviderOptions>(provider: new (client: FloofiClient, opts?: Partial<Options>) => Provider | Provider, opts?: Partial<Options>): this;
}
export {};
