const { Events } = require("discord.js");
const chalk = require('chalk');


module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, client) {
        if (interaction.isMessageContextMenuCommand() || interaction.isUserContextMenuCommand() || interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
    
            if (command) {
                try {
                    console.error(chalk.yellowBright('INTERACTION'), `Someone used /${interaction.commandName}`);
                    await command.execute(interaction, client);
                } catch (error) {
                    console.error(chalk.redBright('ERROR'), error);
                }
            }
        }
	},
};