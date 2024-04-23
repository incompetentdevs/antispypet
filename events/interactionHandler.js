const { Events } = require("discord.js");
const chalk = require('chalk');


module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, client) {
        if (interaction.isMessageContextMenuCommand() || interaction.isUserContextMenuCommand() || interaction.isChatInputCommand()) {
            if (!global.dbready) {
                return interaction.reply({ content: 'im still startin\' up!', ephemeral: true });
            }
    
            const command = client.commands.get(interaction.commandName);
    
            if (command) {
                try {
                    console.error(chalk.yellowBright('INTERACTION'), `${interaction.user.tag} used /${interaction.commandName}`);
                    await command.execute(interaction, client);
                } catch (error) {
                    console.error(chalk.redBright('ERROR'), error);
                }
            }
        }
	},
};