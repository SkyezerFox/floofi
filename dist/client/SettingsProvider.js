"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const events_1 = require("events");
/**
 * Default guild settings
 * @constant {GuildSettings}
 */
exports.DEFAULT_GUILD_SETTINGS = {
    prefix: "!",
    rolePermissions: {},
    userPermissions: {},
};
/**
 * Default provider settings
 * @constant {SettingsProviderOptions}
 */
exports.DEFAULT_PROVIDER_SETTINGS = {
    defaults: {
        guild: exports.DEFAULT_GUILD_SETTINGS,
    },
    overrides: {},
};
/**
 * Class for managing settings
 */
class SettingsProvider extends events_1.EventEmitter {
    constructor(client, options) {
        super();
        this.client = client;
        this.options = Object.assign(exports.DEFAULT_PROVIDER_SETTINGS, options);
        this.client.logger.verbose("[settings] Instiantated the SettingsProvider.");
    }
    /**
     * Called by the client when loging in
     */
    async init() {
        this.emit("warn", "The base SettingsProvider class has no init method.");
        return true;
    }
    /**
     * Get settings for the given guild id
     * @param id Guild id
     */
    async get(id) {
        this.emit("warn", "The base SettingsProvider class has no get method.");
        return exports.DEFAULT_GUILD_SETTINGS;
    }
    /**
     * Get a particular prop of the given settings
     */
    async getProp(id, key) {
        return (await this.get(id))[key];
    }
    /**
     * Get a guild's prefix
     * @param id Guild ID
     */
    async getPrefix(id) {
        return await this.getProp(id, "prefix");
    }
    /**
     * Check if a guild member has the given permission level
     */
    async hasPermission(member, permissionLevel) {
        return (await this.getPermission(member)) >= permissionLevel;
    }
    /**
     * Get the permission level of the member
     * @param member
     */
    async getPermission(member) {
        return Math.max(...(await Promise.all(member.roles.map(async (v) => await this.getRolePermission(member.guild.id, v.id)))), await this.getUserPermission(member.guild.id, member.id), this.options.overrides[member.id]);
    }
    /**
     * Fetch permission level for given user id in given guild id
     * @param guild Guild ID
     * @param userID User ID
     */
    async getUserPermission(guild, userID) {
        const userPerms = await this.getProp(guild, "userPermissions");
        if (userPerms[userID]) {
            return userPerms[userID];
        }
        else {
            return 0;
        }
    }
    /**
     * Fetch permission level for given role id in given guild id
     * @param guild Guild ID
     * @param roleID Role ID
     */
    async getRolePermission(guild, roleID) {
        const rolePerms = await this.getProp(guild, "rolePermissions");
        if (rolePerms[roleID]) {
            return rolePerms[roleID];
        }
        else {
            return 0;
        }
    }
    /**
     * Set new guild settings
     */
    async set(id, newSettings) {
        this.emit("warn", "The base SettingsProvider class has no get method.");
        return false;
    }
    /**
     * Set a particular property of the settings
     * @param id Guild ID
     * @param key Key of the prop
     * @param value New value
     */
    async setProp(id, key, value) {
        return await this.set(id, Object.assign(await this.get("id"), { [key]: value }));
    }
    async updateProp(id, key, newValue) {
        return await this.setProp(id, key, Object.assign(await this.getProp(id, key), newValue));
    }
    /**
     * Grant a user the given permission level
     * @param {string} id The ID of the guild in which to grant permission
     * @param {string} userID The ID of the user
     * @param {number} level The permission level to grant
     */
    async grantUserPermission(id, userID, level) {
        return await this.updateProp(id, "userPermissions", {
            [userID]: level,
        });
    }
    /**
     * Grant a role the given permission level
     * @param {string} id The ID of the guild in which to grant permission
     * @param {userID} roleID The ID of the role
     * @param {number} level The permission level to grant
     */
    async grantRolePermission(id, roleID, level) {
        await this.updateProp(id, "rolePermissions", {
            [roleID]: level,
        });
    }
    /**
     * Grant the given user/role the given permission level
     * @param {Guild} guild The Guild object/ID
     * @param {GuildMember | RoleResolvable | string} resolvable A snowflake, role or GuildMember
     * @param {number} level The permisison level to grant
     */
    async grantPermission(guild, resolvable, level) {
        const guildID = guild instanceof discord_js_1.Guild ? guild.id : guild;
        if (resolvable instanceof discord_js_1.GuildMember || resolvable instanceof discord_js_1.User) {
            return await this.grantUserPermission(guildID, resolvable.id, level);
        }
        if (resolvable instanceof discord_js_1.Role) {
            return await this.grantRolePermission(guildID, resolvable.id, level);
        }
        else {
            const resolvedGuild = this.client.guilds.get(guildID);
            if (!resolvedGuild) {
                return false;
            }
            const resolvedUser = resolvedGuild.members.get(resolvable);
            const resolvedRole = resolvedGuild.roles.get(resolvable);
            if (resolvedUser) {
                return await this.grantUserPermission(resolvedGuild.id, resolvedUser.id, level);
            }
            if (resolvedRole) {
                return await this.grantRolePermission(resolvedGuild.id, resolvedRole.id, level);
            }
            return false;
        }
    }
}
exports.SettingsProvider = SettingsProvider;
