import { useDispatch, useSelector } from 'react-redux';
import styles from './BottomPanel.module.css';
import { RootState } from '../../store/store';
import { clear } from '../../store/pokemonSlice';

export default function BottomPanel() {
  const pokemons = useSelector((state: RootState) => state.pokemons.list);
  const dispatch = useDispatch();

  const unselectAll = (): void => {
    dispatch(clear());
  };

  const downloadCSV = (): void => {
    const csvString = [
      ['Name', 'Description'],
      ...pokemons.map((pokemon) => [pokemon.name, pokemon.description]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = pokemons.length + '_pokemons.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.bottomPanel}>
      <p>{pokemons.length} pokemon(s) are selected</p>
      <button onClick={unselectAll}>Unselect all</button>
      <button onClick={downloadCSV}>Download</button>
    </div>
  );
}
