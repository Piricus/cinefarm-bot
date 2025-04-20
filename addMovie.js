module.exports = {
  name: 'addmovie',
  description: 'Add a new movie to the CineFarm list',
  async execute(interaction) {
    const movieName = interaction.options.getString('name');
    await interaction.reply(`🎬 Movie "${movieName}" added to the list!`);
  },
};