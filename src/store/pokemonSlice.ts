import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../models';

export interface PokemonsState {
  list: Pokemon[];
}

const initialState: PokemonsState = {
  list: [],
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
  },
});

export const { add, remove, clear } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
