import { ComponentProps } from 'react';
import styles from './Card.module.css';
import { add, remove } from '../../../store/pokemonSlice';
import { Pokemon } from '../../../models';
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';

type CardProps = {
  name: string;
  description: string;
};

export default function Card({
  name,
  description,
  onClick,
}: CardProps & ComponentProps<'tr'>) {
  const pokemons = useSelector((state: RootState) => state.pokemons.list);
  const dispatch = useDispatch();

  const handleCheckbox: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const pokemon: Pokemon = { name, description };

    if ((e.target as HTMLInputElement).checked) {
      dispatch(add(pokemon));
    } else {
      dispatch(remove(pokemon));
    }
  };

  const pokemonNames = pokemons.map((pokemon) => pokemon.name);

  return (
    <tr onClick={onClick}>
      <td>
        <input
          type="checkbox"
          onClick={(e) => e.stopPropagation()}
          onChange={handleCheckbox}
          checked={pokemonNames.includes(name)}
        />
      </td>
      <td className={styles.name}>{name}</td>
      <td>{description}</td>
    </tr>
  );
}
