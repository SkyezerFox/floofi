import { RichEmbed, RichEmbedOptions } from "discord.js";
import { FloofiClient } from "../FloofiClient";
/**
 * A nice, fancy embed
 */
export declare class FancyEmbed extends RichEmbed {
    constructor(client: FloofiClient, data?: RichEmbedOptions);
}
