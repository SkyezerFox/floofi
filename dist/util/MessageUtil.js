"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.SelfDestructingMessage = (channel, content, time = 5e3, options) => {
    const messagePromise = channel.send(content, options);
    messagePromise.then((msg) => {
        msg instanceof discord_js_1.Message
            ? msg.delete(time)
            : msg.forEach((v) => v.delete(time));
    });
    return messagePromise;
};
