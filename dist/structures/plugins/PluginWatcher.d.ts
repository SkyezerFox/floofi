import { EventEmitter } from "events";
import { FloofiClient } from "../../client/FloofiClient";
import { FSWatcher } from "fs";
import { Logger } from "winston";
export interface PluginWatcherOptions {
    include: string[];
}
export declare interface PluginWatcher extends EventEmitter {
    client: FloofiClient;
    paths: string[];
    on(eventName: "error", listener: (errorMessage: "INVALID_PATH", path: string) => any): this;
}
/**
 * Second version of the plugin watcher - to dynamically reload plugins on file changes
 */
export declare class PluginWatcher extends EventEmitter {
    client: FloofiClient;
    logger: Logger;
    options: PluginWatcherOptions;
    paths: string[];
    watchers: FSWatcher[];
    watcherTimeouts: Map<string, number | NodeJS.Timeout>;
    constructor(client: FloofiClient, options?: PluginWatcherOptions);
    /**
     * Initialise the file watching.
     */
    init(): Promise<void>;
    handleFileChange(path: string, event: string, filename: string): void;
}
