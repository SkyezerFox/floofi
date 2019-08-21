import { EventEmitter } from "events";
import { FloofiClient } from "../../client/FloofiClient";
import { Plugin } from "./Plugin";
/**
 * Class for dynamically reloading plugins from the file system
 */
export declare class PluginFileManager extends EventEmitter {
    client: FloofiClient;
    plugin?: Plugin;
    constructor(client: FloofiClient);
    /**
     * Recursively looks for plugins in path
     * @param path Path to search in
     */
    loadPluginsFromFile(path: string, watch?: boolean): Promise<void>;
    /**
     * Attempts to find plugins in exported module data
     * @param plugins Loaded module
     */
    handleFileLoad(plugins: {
        [x: string]: Plugin;
    }, watch?: string): Promise<number>;
}
export declare interface PluginFileManager extends EventEmitter {
    client: FloofiClient;
    plugin?: Plugin;
    on(eventName: "error", listener: (err: "ENOTFOUND" | "IMPORT_ERROR") => void): this;
}
