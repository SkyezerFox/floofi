"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
/**
 * Create a self destructing message in the speicified channel that detonates after the specified time
 * @param {TextChannel} channel - The channel to send the message in
 * @param {*} content - Message content
 * @param {number} [time=5e3] - Time after which the message should explode
 * @param {MessageOptions | RichEmbed | Attachment} options - Extra options
 */
exports.SelfDestructingMessage = (channel, content, time = 5e3, options) => {
    const messagePromise = channel.send(content, options);
    messagePromise.then((msg) => {
        msg instanceof discord_js_1.Message
            ? msg.delete(time)
            : msg.forEach((v) => v.delete(time));
    });
    return messagePromise;
};
