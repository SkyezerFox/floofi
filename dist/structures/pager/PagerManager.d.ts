import { Collection, Message, RichEmbed } from "discord.js";
import { FloofiClient } from "../../client/FloofiClient";
import { PagedEmbed } from "./PagedEmbed";
/**
 * Class for managing paged embeds
 */
export declare class PagerManager {
    client: FloofiClient;
    pagers: Collection<string, PagedEmbed>;
    constructor(client: FloofiClient);
    /**
     * Create a paged embed
     * @param message The message to attach the pager to
     * @param data
     */
    createPager(message: Message, data: RichEmbed[]): void;
}
