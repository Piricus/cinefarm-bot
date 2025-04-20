const { loadFilmes, saveFilmes } = require('../utils/database');

module.exports = {
  name: 'adicionarfilme',
  description: 'Adiciona um filme à lista.',
  options: [{ name: 'nome', type: 3, description: 'Nome do filme', required: true }],

  async execute(interaction) {
    const nome = interaction.options.getString('nome');
    const filmes = loadFilmes();

    if (filmes.includes(nome)) {
      await interaction.reply({ content: 'Esse filme já está na lista!', ephemeral: true });
      return;
    }

    filmes.push(nome);
    saveFilmes(filmes);

    await interaction.reply(`🎬 Filme **${nome}** adicionado à lista!`);
  },
};
