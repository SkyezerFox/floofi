import { Message } from "discord.js";
import { FloofiClient } from "../../FloofiClient";
import { SyntaxType } from "../SyntaxType";
/**
 * Syntax type for representing numbers.
 */
export declare class NumberType extends SyntaxType<number> {
    typeName: string;
    parse(client: FloofiClient, message: Message, arg: string, index: number): number;
}
