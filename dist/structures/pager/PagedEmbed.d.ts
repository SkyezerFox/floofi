import { GuildMember, Message, MessageReaction, RichEmbed, User } from "discord.js";
import { EventEmitter } from "events";
import { FloofiClient } from "../../FloofiClient";
/**
 * Class for representing a paged embed
 */
export declare class PagedEmbed extends EventEmitter {
    client: FloofiClient;
    message: Message;
    user: GuildMember;
    pages: RichEmbed[];
    constructor(client: FloofiClient, message: Message, intialiser: GuildMember, pageData: RichEmbed[]);
    /**
     * Add pages
     * @param embeds Embeds to add
     */
    addPage(...embeds: RichEmbed[]): void;
    handleReaction(reaction: MessageReaction, user: User): void;
}
