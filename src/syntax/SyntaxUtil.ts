import { StringType } from "./types/StringType";

export function string(name = "stringArg", maxLength = -1, minLength = -1) {
	return new StringType(name, { maxLength, minLength });
}
