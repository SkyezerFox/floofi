import { Collection } from "discord.js";

import { Client, SettingsProvider } from "../";
import { DEFAULT_GUILD_SETTINGS, GuildSettings } from "./SettingsProvider";

export class MemoryProvider extends SettingsProvider {
	public guilds: Collection<string, GuildSettings>;

	constructor(client: Client) {
		super(client);
		this.guilds = new Collection();
	}

	public async get(id: string) {
		return this.guilds.get(id) || DEFAULT_GUILD_SETTINGS;
	}

	public async set(id: string, value: GuildSettings) {
		this.guilds.set(id, value);
		return true;
	}

	public async init() {
		return true;
	}
}
