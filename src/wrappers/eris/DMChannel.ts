import { Channel, Client } from "eris";

export declare interface DMChannel {
	type: "dm";
}

/**
 * Represents a channel in which text can be sent.
 */
export class DMChannel {
	public client: Client;

	// tslint:disable-next-line: variable-name
	public _channel: Channel;
	constructor(client: Client, channel: Channel) {
		this.client = client;
		this._channel = channel;
	}
}
