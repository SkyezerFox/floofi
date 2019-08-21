import { Client, ClientOptions } from "discord.js";
import * as winston from "winston";
import { CommandRegistry } from "../structures/commands/CommandRegistry";
import { PluginManager, PluginManagerOptions } from "../structures/plugins/PluginManager";
import { SettingsProvider } from "./SettingsProvider";
interface FloofiClientOptions extends ClientOptions {
    debug?: "verbose" | "debug";
    offline: boolean;
    plugins: PluginManagerOptions;
    token: string;
    name: string;
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
    constructor(opts?: Partial<FloofiClientOptions>);
    /**
     * Log into Discord
     */
    login(token?: string, attempt?: number): Promise<string>;
}
export {};
