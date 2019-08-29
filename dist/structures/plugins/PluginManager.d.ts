import { Collection } from "discord.js";
import { EventEmitter } from "events";
import { FloofiClient } from "../../FloofiClient";
import { Plugin } from "./Plugin";
import { PluginWatcher, PluginWatcherOptions } from "./PluginWatcher";
export interface PluginManagerOptions {
    watch: PluginWatcherOptions;
}
export declare class PluginManager extends EventEmitter {
    client: FloofiClient;
    options: PluginManagerOptions;
    plugins: Collection<string, Plugin>;
    pluginWatcher: PluginWatcher;
    baseDir: string;
    constructor(client: FloofiClient, options: PluginManagerOptions);
    /**
     * Adds plugins to the manager
     * @param plugins Plugins to add
     */
    add(...plugins: Array<(client: FloofiClient) => Plugin>): FloofiClient;
    /**
     * Stops the plugins with the specified names
     * @param pluginNames plugin names
     */
    stop(...pluginNames: string[]): void;
    /**
     * Removes and stops the plugins with the specified names
     * @param pluginNames plugin names
     */
    remove(...pluginNames: string[]): void;
    private _stop;
}
