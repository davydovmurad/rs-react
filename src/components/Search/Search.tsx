import { ChangeEvent, ChangeEventHandler, MouseEventHandler } from 'react';
import SearchButton from './SearchButton/SearchButton';
import SearchInput from './SearchInput/SearchInput';
import { SEARCH_REQUEST_LOCAL_STORAGE_KEY } from '../../consts';
import useSearchRequest from '../../hooks/useSearchRequest';

export type SearchProps = {
  updateNameFilter: (name: string) => void;
};

export default function Search({ updateNameFilter }: SearchProps) {
  const [searchRequest, setSearchRequest] = useSearchRequest();

  const handleSearchRequestChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchRequest(e.target.value);
  };

  const handleSearchRequestSubmit: MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    const searchRequestTrim = searchRequest.trim();
    localStorage.setItem(SEARCH_REQUEST_LOCAL_STORAGE_KEY, searchRequestTrim);
    setSearchRequest(searchRequestTrim);
    updateNameFilter(searchRequestTrim);
  };

  return (
    <>
      <SearchInput value={searchRequest} onChange={handleSearchRequestChange} />
      <SearchButton onClick={handleSearchRequestSubmit} />
    </>
  );
}
