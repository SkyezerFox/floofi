import { Guild, GuildMember, RoleResolvable } from "discord.js";
import { EventEmitter } from "events";
import { FloofiClient } from "./FloofiClient";
/**
 * GuildSettings
 *
 * The object used by the SettingsProvider to represent guilds
 *
 * @typedef {Object} GuildSettings
 * @property {string} prefix - The prefix of the guild
 * @property {Object} rolePermissions - An ID object map of permission levels for roles
 * @property {Object} userPermissions - An ID object map of permission levels for users
 */
export interface GuildSettings {
    prefix: string;
    rolePermissions: {
        [x: string]: number;
    };
    userPermissions: {
        [x: string]: number;
    };
}
/**
 * SettingsProviderOptions
 *
 * Options the SettingsProvider uses during runtime
 *
 * @typedef {Object} SettingsProviderOptions
 * @property {Object} defaults - Default values the provider uses
 * @property {GuildSettings} defaults.guild - Default values the provider uses for guilds
 * @property {Object} overrides - Permission overrides for users
 */
export interface SettingsProviderOptions {
    defaults: {
        guild: GuildSettings;
    };
    overrides: {
        [x: string]: number;
    };
}
/**
 * Default guild settings
 * @constant {GuildSettings}
 */
export declare const DEFAULT_GUILD_SETTINGS: GuildSettings;
/**
 * Default provider settings
 * @constant {SettingsProviderOptions}
 */
export declare const DEFAULT_PROVIDER_SETTINGS: SettingsProviderOptions;
export declare interface SettingsProvider {
    on(eventName: "error" | "warn", listener: (message: string) => any): this;
}
/**
 * Class for managing settings
 */
export declare class SettingsProvider extends EventEmitter {
    client: FloofiClient;
    options: SettingsProviderOptions;
    constructor(client: FloofiClient, options?: Partial<SettingsProviderOptions>);
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
     * Get the permission level of the member
     * @param member
     */
    getPermission(member: GuildMember): Promise<number>;
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
    setProp<K extends keyof GuildSettings>(id: string, key: K, value: GuildSettings[K]): Promise<boolean>;
    updateProp<K extends keyof GuildSettings>(id: string, key: K, newValue: GuildSettings[K]): Promise<boolean>;
    /**
     * Grant a user the given permission level
     * @param {string} id The ID of the guild in which to grant permission
     * @param {string} userID The ID of the user
     * @param {number} level The permission level to grant
     */
    grantUserPermission(id: string, userID: string, level: number): Promise<boolean>;
    /**
     * Grant a role the given permission level
     * @param {string} id The ID of the guild in which to grant permission
     * @param {userID} roleID The ID of the role
     * @param {number} level The permission level to grant
     */
    grantRolePermission(id: string, roleID: string, level: number): Promise<void>;
    /**
     * Grant the given user/role the given permission level
     * @param {Guild} guild The Guild object/ID
     * @param {GuildMember | RoleResolvable | string} resolvable A snowflake, role or GuildMember
     * @param {number} level The permisison level to grant
     */
    grantPermission(guild: Guild | string, resolvable: GuildMember | RoleResolvable | string, level: number): Promise<boolean | void>;
}
