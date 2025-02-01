import { Component, ReactNode } from 'react';
import Search from '../Search/Search';
import './Header.module.css';

export default class Header extends Component {
  render(): ReactNode {
    return (
      <header>
        <Search />
      </header>
    );
  }
}
