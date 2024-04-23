require('dotenv').config();
require('./helpers');
const fs = require('fs');
const { Client, GatewayIntentBits, Partials, Events } = require('discord.js');
const path = require('node:path');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
	],
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember],
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => {
	return file.endsWith('.js') && !file.startsWith('--');
});


for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	let events = require(filePath);
	if (!Array.isArray(events)) {
		events = [events];
	}
	for (const event of events) {
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, client));
		} else {
			client.on(event.name, (...args) => event.execute(...args, client));
		}
	}
}

client.login(process.env.TOKEN);

client.on('rateLimit', function (rateLimitData) {
	console.log('the rate limit has been hit!  Slow\'r down a tad.');
	console.log({ rateLimitData });
});