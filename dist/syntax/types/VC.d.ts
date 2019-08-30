import { Message } from "discord.js";
import { FloofiClient } from "../../FloofiClient";
import { SyntaxType } from "../SyntaxType";
/**
 * Syntax type used to effectively disable syntax parsing.
 */
export declare class VCType extends SyntaxType<any> {
    typeName: string;
    parse(client: FloofiClient, message: Message, arg: string): string;
}
