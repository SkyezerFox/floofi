import { EventEmitter } from "events";

import { Client, Util } from "../..";

export declare interface MediaPlayer extends EventEmitter {
	on(eventName: string, listener: Util.TSUtil.Listener<any>): this;
}

interface Track {
	name: string;
	duration: number;
	type: "yt" | "sc";
}

export class MediaPlayer extends EventEmitter {
	public client: Client;

	public queue: Track[];

	constructor(client: Client) {
		super();
		this.client = client;
	}

	public async init() {}
}
