const { loadFilmes } = require('../utils/database');
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

// Armazena temporariamente os votos dos usuários (em memória)
let votos = {};

module.exports = {
  name: 'sorteio',
  description: 'Inicia o sorteio de filmes entre os escolhidos dos participantes.',

  async execute(interaction) {
    votos = {};
    await interaction.reply('🎲 Vamos começar o sorteio! Cada participante deve escolher 3 filmes. Envie os nomes um por um.');

    // Ouvir respostas dos usuários por 60s
    const filter = m => !m.author.bot;
    const collector = interaction.channel.createMessageCollector({ filter, time: 60000 });

    collector.on('collect', m => {
      const userId = m.author.id;
      const filme = m.content.trim();

      if (!votos[userId]) votos[userId] = [];
      if (votos[userId].length < 3 && !votos[userId].includes(filme)) {
        votos[userId].push(filme);
        m.react('✅');
      }
    });

    collector.on('end', async () => {
      const todosFilmes = Object.values(votos).flat();
      if (todosFilmes.length < 1) {
        await interaction.followUp('❌ Nenhum filme foi indicado.');
        return;
      }

      // Sorteio eliminatório
      let selecionados = [...todosFilmes];
      while (selecionados.length > 1) {
        const eliminado = selecionados.splice(Math.floor(Math.random() * selecionados.length), 1);
        await interaction.followUp(`🗑️ Filme eliminado: **${eliminado[0]}**`);
        await new Promise(r => setTimeout(r, 1500));
      }

      const vencedor = selecionados[0];
      await interaction.followUp(`🏆 Filme sorteado: **${vencedor}**`);

      // Aqui futuramente: buscar trailer, onde assistir e nota do IMDB
    });
  },
};
