import { PAGINATION_LIMIT } from './consts';
import { Pokemon } from './models';

export interface PokemonsData {
  count: number;
  pokemons: Pokemon[];
}

interface PokemonsListResponseData {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

interface PokemonResponseData {
  species: {
    name: string;
    url: string;
  };
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
    nameFilter: string | null = null,
    offset: number = 0
  ): Promise<PokemonsData | undefined> {
    const pokemons: Pokemon[] = [];
    const response: Response = await fetch(
      `${this.BASE_URL}/pokemon?limit=${PAGINATION_LIMIT}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const pokemonResponseData: PokemonsListResponseData = await response.json();
    let pokemonsData = pokemonResponseData.results;

    if (nameFilter) {
      pokemonsData = pokemonsData.filter((pokemon) =>
        pokemon.name.startsWith(nameFilter)
      );
    }

    for (const pokemon of pokemonsData) {
      const pokemonResponse: Response = await fetch(pokemon.url);
      const pokemonResponseData: PokemonResponseData =
        await pokemonResponse.json();
      const pokemonSpeciesResponse: Response = await fetch(
        pokemonResponseData.species.url
      );

      const pokemonSpecies: PokemonSpeciesResponseData =
        await pokemonSpeciesResponse.json();
      const texts: string[] = [];

      pokemonSpecies.flavor_text_entries.forEach((spec) => {
        const text = spec.flavor_text.replace(/[\n\f]/g, ' ');
        if (spec.language.name !== 'en' || texts.includes(text)) {
          return;
        }
        texts.push(text);
      });
      pokemons.push({ name: pokemon.name, description: texts.join(' ') });
    }

    return { count: pokemonResponseData.count, pokemons: pokemons };
  }
}
