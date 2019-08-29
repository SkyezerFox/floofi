import { Collection } from "discord.js";
import { Client, SettingsProvider } from "../";
import { GuildSettings } from "./SettingsProvider";
export declare class MemoryProvider extends SettingsProvider {
    guilds: Collection<string, GuildSettings>;
    constructor(client: Client);
    get(id: string): Promise<GuildSettings>;
    set(id: string, value: GuildSettings): Promise<boolean>;
    init(): Promise<boolean>;
}
