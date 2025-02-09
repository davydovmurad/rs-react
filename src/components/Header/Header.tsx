import Search, { SearchProps } from '../Search/Search';
import './Header.css';

export default function Header({ updateNameFilter }: SearchProps) {
  return (
    <header>
      <Search updateNameFilter={updateNameFilter} />
    </header>
  );
}
