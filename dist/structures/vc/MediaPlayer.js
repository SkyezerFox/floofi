"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class MediaPlayer extends events_1.EventEmitter {
    constructor(client) {
        super();
        this.client = client;
    }
    async init() { }
}
exports.MediaPlayer = MediaPlayer;
