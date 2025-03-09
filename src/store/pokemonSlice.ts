import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../models';

export interface PokemonsState {
  list: Pokemon[];
  nameFilter: string;
  detailsPokemon: Pokemon;
}

const initialState: PokemonsState = {
  list: [],
  nameFilter: '',
  detailsPokemon: { name: '', description: '' },
};

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Pokemon>) => {
      state.list.push(action.payload);
    },
    remove: (state, action: PayloadAction<Pokemon>) => {
      state.list = state.list.filter(
        (pokemon) => pokemon.name != action.payload.name
      );
    },
    clear: (state) => {
      state.list = [];
    },
    updateNameFilter: (state, action: PayloadAction<string>) => {
      state.nameFilter = action.payload;
    },
    setDetailsPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.detailsPokemon = action.payload;
    },
  },
});

export const { add, remove, clear, updateNameFilter, setDetailsPokemon } =
  pokemonsSlice.actions;

export default pokemonsSlice.reducer;
