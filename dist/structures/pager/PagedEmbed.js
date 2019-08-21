"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
/**
 * Class for representing a paged embed
 */
class PagedEmbed extends events_1.EventEmitter {
    constructor(client, message, intialiser, pageData) {
        super();
        this.client = client;
        this.message = message;
        this.user = intialiser;
        this.pages = [];
        this.on("handleReaction", this.handleReaction);
    }
    /**
     * Add pages
     * @param embeds Embeds to add
     */
    addPage(...embeds) {
        this.pages = this.pages.concat(...embeds);
    }
    handleReaction(reaction, user) {
        if (reaction.message.id !== this.message.id) {
            return;
        }
    }
}
exports.PagedEmbed = PagedEmbed;
