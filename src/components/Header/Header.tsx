import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import useSearchRequest from '../../hooks/useSearchRequest';
import { updateNameFilter } from '../../store/pokemonSlice';
import SearchInput from '../Search/SearchInput/SearchInput';
import SearchButton from '../Search/SearchButton/SearchButton';
import { SEARCH_REQUEST_LOCAL_STORAGE_KEY } from '../../consts';
import styles from './Header.module.css';

export default function Header() {
  const { searchRequest, setSearchRequest } = useSearchRequest();
  const [inputValue, setInputValue] = useState(searchRequest);
  const dispatch = useDispatch();

  const handleSearchRequestChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue(e.target.value);
  };

  const handleSearchRequestSubmit: MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    const searchRequestTrim = inputValue.trim();
    localStorage.setItem(SEARCH_REQUEST_LOCAL_STORAGE_KEY, searchRequestTrim);
    setSearchRequest(searchRequestTrim);
    dispatch(updateNameFilter(searchRequestTrim));
  };

  return (
    <header className={styles.header}>
      <SearchInput value={inputValue} onChange={handleSearchRequestChange} />
      <SearchButton onClick={handleSearchRequestSubmit} />
    </header>
  );
}
