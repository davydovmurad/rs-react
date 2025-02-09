import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ErrorButton from './components/ErrorButton';
import './App.css';
import useSearchRequest from './hooks/useSearchRequest';

export default function App() {
  const [nameFilter, setNameFilter] = useSearchRequest();

  return (
    <>
      <Header updateNameFilter={setNameFilter} />
      <Main nameFilter={nameFilter} />
      <ErrorButton />
    </>
  );
}
