import { Message } from "discord.js";
import { FloofiClient } from "../../FloofiClient";
import { SyntaxType } from "../SyntaxType";
/**
 * Syntax type used to represent boolean values.
 */
export declare class BooleanType extends SyntaxType<boolean> {
    static typeName: string;
    parse(client: FloofiClient, message: Message, arg: string, index: number): boolean;
}
