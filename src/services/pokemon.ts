import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { PAGINATION_LIMIT } from '../consts';
import { Pokemon } from '../models';

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

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getAllPokemons: builder.query<
      PokemonsData,
      { nameFilter: string | null; offset: number }
    >({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        const nameFilter = arg.nameFilter;
        const pokemons: Pokemon[] = [];

        const pokemonsAllUrl = nameFilter
          ? 'pokemon?limit=10000&offset=0'
          : `pokemon?limit=${PAGINATION_LIMIT}&offset=${arg.offset}`;
        const pokemonsResponse = await fetchWithBQ(pokemonsAllUrl);
        const pokemonsResponseData =
          pokemonsResponse.data as PokemonsListResponseData;
        const pokemonsCount = nameFilter
          ? PAGINATION_LIMIT
          : pokemonsResponseData.count;

        let pokemonsData = nameFilter
          ? pokemonsResponseData.results.filter((pokemon) =>
              pokemon.name.startsWith(nameFilter)
            )
          : pokemonsResponseData.results;
        pokemonsData = pokemonsData.slice(
          0,
          Math.min(PAGINATION_LIMIT, pokemonsData.length)
        );

        if (pokemonsResponse.error)
          return { error: pokemonsResponse.error as FetchBaseQueryError };

        for (const pokemon of pokemonsData) {
          const pokemonResponse = await fetch(pokemon.url);
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
        return {
          data: { count: pokemonsCount, pokemons: pokemons },
        };
      },
    }),
  }),
});

export const { useGetAllPokemonsQuery } = pokemonApi;
