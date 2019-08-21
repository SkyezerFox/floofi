import { FloofiClient } from "../../client/FloofiClient";
import { SyntaxType, SyntaxTypeOptions } from "../SyntaxType";

/**
 * Syntax type for representing strings
 */
export class AnyType extends SyntaxType<any> {
	public typeName = "any";

	public parse(client: FloofiClient, arg: string) {
		return arg;
	}
}
