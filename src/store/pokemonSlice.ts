import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../models';
import { SEARCH_REQUEST_LOCAL_STORAGE_KEY } from '../consts';

export interface PokemonsState {
  list: Pokemon[];
  nameFilter: string;
}

const initialState: PokemonsState = {
  list: [],
  nameFilter: localStorage.getItem(SEARCH_REQUEST_LOCAL_STORAGE_KEY) || '',
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
  },
});

export const { add, remove, clear, updateNameFilter } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
