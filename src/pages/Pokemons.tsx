import ErrorButton from '../components/ErrorButton';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import useSearchRequest from '../hooks/useSearchRequest';

export default function Pokemons() {
  const [nameFilter, setNameFilter] = useSearchRequest();

  return (
    <>
      <Header updateNameFilter={setNameFilter} />
      <Main nameFilter={nameFilter} />
      <ErrorButton />
    </>
  );
}
