import { createPlugin } from "../src";

export const test = createPlugin("test", (c) => {
	c.logger.info("test plugin loaded.");
});
