import { Client as ErisClient } from "eris";
import { EventEmitter } from "events";

import { Listener } from "./types/events";

export declare interface Client extends EventEmitter {
	on(eventName: "ready", listener: Listener): this;
}

export class Client extends EventEmitter {
	// Eris Client
	// tslint:disable-next-line: variable-name
	public _client: ErisClient;

	constructor() {
		super();
		this._client = new ErisClient("");

		this._client.on("ready", () => this.emit("ready"));
	}
}
