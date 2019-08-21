import { RichEmbed } from "discord.js";
import { FancyEmbed } from "./FancyEmbed";
export declare const smallErrorEmbed: (msg: string) => RichEmbed;
export declare const bigErrorEmbed: (title: string, msg: string) => FancyEmbed;
export declare const smallCheckEmbed: (msg: string) => RichEmbed;
export declare const bigCheckEmbed: (msg: string) => RichEmbed;
