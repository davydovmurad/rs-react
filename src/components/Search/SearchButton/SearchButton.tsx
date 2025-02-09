import { ComponentProps } from 'react';
import './SearchButton.css';

export default function SearchButton(props: ComponentProps<'button'>) {
  return <button {...props}>Search</button>;
}
