module.exports = {
  name: 'removemovie',
  description: 'Remove a movie from the CineFarm list',
  async execute(interaction) {
    const movieName = interaction.options.getString('name');
    await interaction.reply(`🗑️ Movie "${movieName}" removed from the list.`);
  },
};