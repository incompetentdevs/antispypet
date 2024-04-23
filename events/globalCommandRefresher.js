const { REST } = require('@discordjs/rest');
const { Events, Routes, Collection } = require('discord.js');
const chalk = require('chalk');
const { guildId } = require('../config.json');
const path = require('path');
const fs = require('fs').promises;

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

async function refreshApplicationCommands(client, commands) {
    try {

        console.log(chalk.yellowBright('REFRESHING'), 'Started refreshing global application commands.');

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands }
        );

        console.log(chalk.greenBright('REFRESHED'), 'Successfully refreshed global application commands.');
    } catch (error) {
        handleRefreshError(error);
    }
}

function handleRefreshError(error) {
    if (error.code === 50001) {
        console.log(chalk.redBright('CRITICAL ERROR'), 'I can\'t access the guild in config.');
        process.exit(0); // this will be replaced once we can do global commands
    } else {
        console.error(error);
    }
}

async function readCommands(dir, client) {
    const commandFiles = await fs.readdir(dir);

    for (const file of commandFiles) {
        const filePath = path.join(dir, file);
        const stats = await fs.lstat(filePath);

        if (stats.isDirectory()) {
            // If it's a directory, recursively read its contents
            await readCommands(filePath, client);
        } else if (file.endsWith('.js') && !file.startsWith('--')) {
            const commandEntry = require(filePath);
            const commandList = Array.isArray(commandEntry) ? commandEntry : [commandEntry];

            for (const command of commandList) {
                client.commands.set(command.data.name, command);
                client.commandsList.push(command.data.toJSON());
            }
        }
    }
}

module.exports = {
    name: Events.ClientReady,
    async execute(client) {
        client.commands = new Collection();
        client.commandsList = [];

        const rootCommandsPath = path.join(__dirname, '../globalcommands');
        await readCommands(rootCommandsPath, client);
        await refreshApplicationCommands(client, client.commandsList);
    },
};
