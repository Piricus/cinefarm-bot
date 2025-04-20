
const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('filmeinfo')
    .setDescription('Mostra trailer, onde assistir e nota IMDB do filme.')
    .addStringOption(option =>
      option.setName('titulo')
        .setDescription('Nome do filme')
        .setRequired(true)),
  async execute(interaction) {
    const titulo = interaction.options.getString('titulo');
    const apiKey = process.env.TMDB_API_KEY;
    const query = encodeURIComponent(titulo);

    const searchRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
    const searchData = await searchRes.json();

    if (!searchData.results || searchData.results.length === 0) {
      return interaction.reply('Filme não encontrado. 😢');
    }

    const filme = searchData.results[0];
    const movieId = filme.id;

    const movieDetailsRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos,watch/providers`);
    const movieDetails = await movieDetailsRes.json();

    const trailer = movieDetails.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : 'Trailer não encontrado.';

    const providers = movieDetails['watch/providers']?.results?.BR?.flatrate || [];
    const ondeAssistir = providers.length > 0 ? providers.map(p => p.provider_name).join(', ') : 'Não encontrado.';

    const imdbRating = movieDetails.vote_average || 'Sem nota';

    return interaction.reply(`🎬 **${filme.title}**
📽️ Trailer: ${trailerUrl}
📍 Onde assistir: ${ondeAssistir}
⭐ Nota IMDB: ${imdbRating}`);
  },
};
