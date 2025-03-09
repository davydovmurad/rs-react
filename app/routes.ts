import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/pokemons.tsx'),
  route('details', 'routes/pokemon_details/pokemon_details.tsx'),
] satisfies RouteConfig;
