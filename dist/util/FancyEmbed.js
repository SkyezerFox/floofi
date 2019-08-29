"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
/**
 * A nice, fancy embed
 */
class FancyEmbed extends discord_js_1.RichEmbed {
    constructor(client, data) {
        super(data);
        this.setFooter(`${client.options.name}`, client.user.avatarURL);
        this.setTimestamp();
    }
}
exports.FancyEmbed = FancyEmbed;
