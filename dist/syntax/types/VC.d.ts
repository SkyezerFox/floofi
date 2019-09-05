import { Message, VoiceChannel } from "discord.js";
import { FloofiClient } from "../../FloofiClient";
import { SyntaxType } from "../SyntaxType";
/**
 * Syntax type used to effectively disable syntax parsing.
 */
export declare class VCType extends SyntaxType<VoiceChannel> {
    static typeName: string;
    parse(client: FloofiClient, message: Message, arg: string, index: number): VoiceChannel;
}
