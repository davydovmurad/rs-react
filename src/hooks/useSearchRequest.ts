import { useState } from 'react';
import { SEARCH_REQUEST_LOCAL_STORAGE_KEY } from '../consts';

export default function useSearchRequest() {
  return useState<string>(
    localStorage.getItem(SEARCH_REQUEST_LOCAL_STORAGE_KEY) || ''
  );
}
