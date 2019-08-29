import { Guild, GuildMember, GuildMemberResolvable, Role, RoleResolvable, User } from "discord.js";
import { EventEmitter } from "events";

import { FloofiClient } from "../FloofiClient";

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

	rolePermissions: { [x: string]: number };
	userPermissions: { [x: string]: number };
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
	overrides: { [x: string]: number };
}

/**
 * Default guild settings
 * @constant {GuildSettings}
 */
export const DEFAULT_GUILD_SETTINGS: GuildSettings = {
	prefix: "!",

	rolePermissions: {},
	userPermissions: {},
};

/**
 * Default provider settings
 * @constant {SettingsProviderOptions}
 */
export const DEFAULT_PROVIDER_SETTINGS: SettingsProviderOptions = {
	defaults: {
		guild: DEFAULT_GUILD_SETTINGS,
	},
	overrides: {},
};

export declare interface SettingsProvider {
	on(eventName: "error" | "warn", listener: (message: string) => any): this;
}

/**
 * Class for managing settings
 */
export class SettingsProvider extends EventEmitter {
	public client: FloofiClient;

	public options: SettingsProviderOptions;

	constructor(
		client: FloofiClient,
		options?: Partial<SettingsProviderOptions>,
	) {
		super();

		this.client = client;
		this.options = Object.assign(DEFAULT_PROVIDER_SETTINGS, options);

		this.client.logger.verbose(
			"[settings] Instiantated the SettingsProvider.",
		);
	}

	/**
	 * Called by the client when loging in
	 */
	public async init(): Promise<boolean> {
		this.emit(
			"warn",
			"The base SettingsProvider class has no init method.",
		);
		return true;
	}

	/**
	 * Get settings for the given guild id
	 * @param id Guild id
	 */
	public async get(id: string): Promise<GuildSettings> {
		this.emit("warn", "The base SettingsProvider class has no get method.");
		return DEFAULT_GUILD_SETTINGS;
	}

	/**
	 * Get a particular prop of the given settings
	 */
	public async getProp<K extends keyof GuildSettings>(
		id: string,
		key: K,
	): Promise<GuildSettings[K]> {
		return (await this.get(id))[key];
	}

	/**
	 * Get a guild's prefix
	 * @param id Guild ID
	 */
	public async getPrefix(id: string) {
		return await this.getProp(id, "prefix");
	}

	/**
	 * Check if a guild member has the given permission level
	 */
	public async hasPermission(member: GuildMember, permissionLevel: number) {
		return (await this.getPermission(member)) >= permissionLevel;
	}

	/**
	 * Get the permission level of the member
	 * @param member
	 */
	public async getPermission(member: GuildMember) {
		return Math.max(
			...(await Promise.all(
				member.roles.map(
					async (v) =>
						await this.getRolePermission(member.guild.id, v.id),
				),
			)),
			await this.getUserPermission(member.guild.id, member.id),
			this.options.overrides[member.id],
		);
	}

	/**
	 * Fetch permission level for given user id in given guild id
	 * @param guild Guild ID
	 * @param userID User ID\
	 */
	public async getUserPermission(
		guild: string,
		userID: string,
	): Promise<number> {
		const userPerms = await this.getProp(guild, "userPermissions");

		if (userPerms[userID]) {
			return userPerms[userID];
		} else {
			return 0;
		}
	}

	/**
	 * Fetch permission level for given role id in given guild id
	 * @param guild Guild ID
	 * @param roleID Role ID
	 */
	public async getRolePermission(guild: string, roleID: string) {
		const rolePerms = await this.getProp(guild, "rolePermissions");

		if (rolePerms[roleID]) {
			return rolePerms[roleID];
		} else {
			return 0;
		}
	}

	/**
	 * Set new guild settings
	 */
	public async set(id: string, newSettings: GuildSettings): Promise<boolean> {
		this.emit("warn", "The base SettingsProvider class has no get method.");
		return false;
	}

	/**
	 * Set a particular property of the settings
	 * @param id Guild ID
	 * @param key Key of the prop
	 * @param value New value
	 */
	public async setProp<K extends keyof GuildSettings>(
		id: string,
		key: K,
		value: GuildSettings[K],
	) {
		return await this.set(
			id,
			Object.assign(await this.get("id"), { [key]: value }),
		);
	}

	public async updateProp<K extends keyof GuildSettings>(
		id: string,
		key: K,
		newValue: GuildSettings[K],
	) {
		return await this.setProp(
			id,
			key,
			Object.assign(await this.getProp(id, key), newValue),
		);
	}

	/**
	 * Grant a user the given permission level
	 * @param {string} id The ID of the guild in which to grant permission
	 * @param {string} userID The ID of the user
	 * @param {number} level The permission level to grant
	 */
	public async grantUserPermission(
		id: string,
		userID: string,
		level: number,
	) {
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
	public async grantRolePermission(
		id: string,
		roleID: string,
		level: number,
	) {
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
	public async grantPermission(
		guild: Guild | string,
		resolvable: GuildMember | RoleResolvable | string,
		level: number,
	) {
		const guildID = guild instanceof Guild ? guild.id : guild;

		if (resolvable instanceof GuildMember || resolvable instanceof User) {
			return await this.grantUserPermission(
				guildID,
				resolvable.id,
				level,
			);
		}
		if (resolvable instanceof Role) {
			return await this.grantRolePermission(
				guildID,
				resolvable.id,
				level,
			);
		} else {
			const resolvedGuild = this.client.guilds.get(guildID);
			if (!resolvedGuild) {
				return false;
			}

			const resolvedUser = resolvedGuild.members.get(resolvable);
			const resolvedRole = resolvedGuild.roles.get(resolvable);

			if (resolvedUser) {
				return await this.grantUserPermission(
					resolvedGuild.id,
					resolvedUser.id,
					level,
				);
			}

			if (resolvedRole) {
				return await this.grantRolePermission(
					resolvedGuild.id,
					resolvedRole.id,
					level,
				);
			}

			return false;
		}
	}
}
