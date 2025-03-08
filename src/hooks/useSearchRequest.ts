import { useState } from 'react';
import { SEARCH_REQUEST_LOCAL_STORAGE_KEY } from '../consts';

const useSearchRequest = () => {
  let initValue = '';

  if (typeof window !== 'undefined') {
    initValue = localStorage.getItem(SEARCH_REQUEST_LOCAL_STORAGE_KEY) || '';
  }

  const [searchRequest, setLocalStorageValue] = useState(initValue);

  const setSearchRequest = (value: string) => {
    localStorage.setItem(SEARCH_REQUEST_LOCAL_STORAGE_KEY, value);
    setLocalStorageValue(value);
  };
  return { searchRequest, setSearchRequest };
};

export default useSearchRequest;
