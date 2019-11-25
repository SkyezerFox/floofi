import { FloofiClient } from "../FloofiClient";
import { Message } from "../types/wrappers";

export class Wrapper {
	public client: FloofiClient;

	constructor(client: FloofiClient) {
		this.client = client;
	}
}
