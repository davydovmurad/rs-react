import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './pokemonSlice';
import { pokemonApi } from '../services/pokemon';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
