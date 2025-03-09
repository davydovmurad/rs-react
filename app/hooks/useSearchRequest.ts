import { useState } from 'react';
import { SEARCH_REQUEST_LOCAL_STORAGE_KEY } from '../consts';

const useSearchRequest = () => {
  const [searchRequest, setLocalStorageValue] = useState(
    localStorage.getItem(SEARCH_REQUEST_LOCAL_STORAGE_KEY) || ''
  );

  const setSearchRequest = (value: string) => {
    localStorage.setItem(SEARCH_REQUEST_LOCAL_STORAGE_KEY, value);
    setLocalStorageValue(value);
  };
  return { searchRequest, setSearchRequest };
};

export default useSearchRequest;
