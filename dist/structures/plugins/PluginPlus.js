"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Plugin extends events_1.EventEmitter {
    get name() {
        return this.constructor.name;
    }
}
exports.Plugin = Plugin;
