module.exports = {
  name: 'ping',
  description: 'Check if the bot is alive',
  async execute(interaction) {
    await interaction.reply('🏓 Pong! Bot is alive and well.');
  },
};