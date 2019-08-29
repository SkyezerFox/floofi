<div align="center">
  <br />
  <p>
    <a href="https://github.com/orifoxx/floofi"><img src="https://raw.githubusercontent.com/orifoxx/floofi/master/docs/assets/splash.png" width="546" alt="floofi" /></a>
  </p>
  <br />
</div>

## About

This library has gone through too many rewrites.... I think this version might actually be usable.

floofi is a wrapper for the already powerful [discord.js](https://discord.js.org) module, providing tools and utilities otherwise unavailable in the base library.

## Installation

**I have not tested this library below Node.js 10.** I suggest you use the latest suggested version, as this is the version I'm developing the library in.

Using [NPM](https://npmjs.org):

`npm install floofi`

Or, using [yarn](https://yarnpkg.org):

`yarn add floofi`

## Example usage

```js
const floofi = require("floofi");
const client = new floofi.Client();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.add(
	new floofi.Command("ping", 0, "", (client, message, arguments) => {
		return message.reply("Pong!");
	})
);

client.login("token");
```

or, using TypeScript:

```ts
import * as floofi from "floofi";
const client = new floofi.Client();

client.add(
	new floofi.Command<[number, number]>(
		"add",
		0,
		"a:number b:number",
		(client, message, arguments) => {
			return message.reply(arguments[0] + arguments[1]);
		}
	)
);

client.login("token");
```

## Help

If you have any questions/issues that aren't already answered here, feel free to contact me on [Twitter](https://twitter.com/orifoxx).
