import { useEffect, useState } from 'react';
import CardList from '../Card/CardList/CardList';
import { Pokemon } from '../../models';
import PokemonApiService from '../../api';
import Loader from '../../ui/Loader/Loader';
import styles from './Main.module.css';

type MainProps = {
  nameFilter: string | null;
};

export default function Main({ nameFilter }: MainProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const pokemons =
          (await new PokemonApiService().getPokemons(nameFilter)) || [];
        setPokemons(pokemons);
      } catch (error) {
        setError(String(error));
      }
      setIsLoading(false);
    };

    fetchPokemons();
  }, [nameFilter]);

  return (
    <section className={styles.main}>
      {error && <p>Failed to fetch</p>}

      {!error && (isLoading ? <Loader /> : <CardList pokemons={pokemons} />)}
    </section>
  );
}
