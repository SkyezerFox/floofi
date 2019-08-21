import { GuildMember } from "discord.js";
import { EventEmitter } from "events";
import { FloofiClient } from "./FloofiClient";
interface GuildSettings {
    prefix: string;
    rolePermissions: {
        [x: string]: number;
    };
    userPermissions: {
        [x: string]: number;
    };
}
interface SettingsProviderOptions {
    defaults: {
        guild: GuildSettings;
    };
}
export declare interface SettingsProvider {
    on(eventName: "error" | "warn", listener: (message: string) => any): this;
}
/**
 * Class for managing settings
 */
export declare class SettingsProvider extends EventEmitter {
    client: FloofiClient;
    options: SettingsProviderOptions;
    constructor(client: FloofiClient, options?: SettingsProviderOptions);
    /**
     * Called by the client when loging in
     */
    init(): Promise<boolean>;
    /**
     * Get settings for the given guild id
     * @param id Guild id
     */
    get(id: string): Promise<GuildSettings>;
    /**
     * Get a particular prop of the given settings
     */
    getProp<K extends keyof GuildSettings>(id: string, key: K): Promise<GuildSettings[K]>;
    /**
     * Get a guild's prefix
     * @param id Guild ID
     */
    getPrefix(id: string): Promise<string>;
    /**
     * Check if a guild member has the given permission level
     */
    hasPermission(member: GuildMember, permissionLevel: number): Promise<boolean>;
    /**
     * Fetch permission level for given user id in given guild id
     * @param guild Guild ID
     * @param userID User ID
     */
    getUserPermission(guild: string, userID: string): Promise<number>;
    /**
     * Fetch permission level for given role id in given guild id
     * @param guild Guild ID
     * @param roleID Role ID
     */
    getRolePermission(guild: string, roleID: string): Promise<number>;
    /**
     * Set new guild settings
     */
    set(id: string, newSettings: GuildSettings): Promise<boolean>;
    /**
     * Set a particular property of the settings
     * @param id Guild ID
     * @param key Key of the prop
     * @param value New value
     */
    setProp<K extends keyof GuildSettings>(id: string, key: keyof GuildSettings, value: GuildSettings[K]): Promise<boolean>;
}
export {};
