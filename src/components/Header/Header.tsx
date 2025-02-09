import { ComponentProps } from 'react';
import Search, { SearchProps } from '../Search/Search';
import './Header.css';

export default function Header({
  updateNameFilter,
  onClick,
}: SearchProps & ComponentProps<'header'>) {
  return (
    <header onClick={onClick}>
      <Search updateNameFilter={updateNameFilter} />
    </header>
  );
}
