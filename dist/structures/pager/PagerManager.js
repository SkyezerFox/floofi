"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const PagedEmbed_1 = require("./PagedEmbed");
/**
 * Class for managing paged embeds
 */
class PagerManager {
    constructor(client) {
        this.client = client;
        this.pagers = new discord_js_1.Collection();
        this.client.on("messageReactionAdd", (reaction, user) => {
            const pager = this.pagers.get(reaction.message.id);
            if (pager) {
                pager.handleReaction(reaction, user);
            }
        });
        this.client.on("messageDelete", (message) => {
            const pager = this.pagers.get(message.id);
            if (pager) {
                pager.emit("destroy");
                this.pagers.delete(message.id);
            }
        });
    }
    /**
     * Create a paged embed
     * @param message The message to attach the pager to
     * @param data
     */
    createPager(message, data) {
        const pager = new PagedEmbed_1.PagedEmbed(this.client, message, message.member, data);
        this.pagers.set(message.id, pager);
    }
}
exports.PagerManager = PagerManager;
