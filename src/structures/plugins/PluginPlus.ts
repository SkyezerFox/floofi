import { EventEmitter } from "events";

export declare interface Plugin {
	pluginWillLoad: () => void;
	pluginWillInit: () => void;
	pluginWillStop: () => void;
	pluginWillUnload: () => void;
	pluginWillReload: () => void;
}

export class Plugin extends EventEmitter {
	get name() {
		return this.constructor.name;
	}
}
