import { Pokemon } from './models';

interface PokemonResponseData {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

interface PokemonSpeciesResponseData {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
}

export default class PokemonApiService {
  private BASE_URL: string = 'https://pokeapi.co/api/v2';

  async getPokemons(
    nameFilter: string | null = null
  ): Promise<Pokemon[] | undefined> {
    const pokemons: Pokemon[] = [];
    const response: Response = await fetch(this.BASE_URL + '/pokemon');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const pokemonResponseData: PokemonResponseData = await response.json();
    let pokemonsData = pokemonResponseData.results;

    if (nameFilter) {
      pokemonsData = pokemonsData.filter((pokemon) =>
        pokemon.name.startsWith(nameFilter)
      );
    }

    for (const pokemon of pokemonsData) {
      const name = pokemon.name;
      const response: Response = await fetch(
        this.BASE_URL + '/pokemon-species/' + name
      );

      const pokemonSpecies: PokemonSpeciesResponseData = await response.json();
      const texts: string[] = [];

      pokemonSpecies.flavor_text_entries.forEach((spec) => {
        const text = spec.flavor_text.replace(/[\n\f]/g, ' ');
        if (spec.language.name !== 'en' || texts.includes(text)) {
          return;
        }
        texts.push(text);
      });
      pokemons.push({ name: name, description: texts.join(' ') });
    }

    return pokemons;
  }
}
