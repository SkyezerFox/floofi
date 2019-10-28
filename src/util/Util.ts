import { Message as ErisMessage, User as ErisUser } from "eris";
import { isNullOrUndefined } from "util";

import { Client } from "../ErisClient";
import { Message } from "../wrappers/eris/MessageWrapper";
import { User } from "../wrappers/UserWrapper";

/**
 * Shorthand for inverse isNullOrUndefined.
 */
export const exists = (prop: any) => (isNullOrUndefined(prop) ? false : true);

export const cachedOrCache = <CachedObject extends Message | User>(
	client: Client,
	cacheResolvable: ErisMessage | ErisUser,
): CachedObject => {};
