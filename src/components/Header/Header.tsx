import { Component, ReactNode } from 'react';
import Search from '../Search/Search';
import './Header.module.css';

export default class Header extends Component<{
  updateNameFilter: (name: string | null) => void;
}> {
  render(): ReactNode {
    return (
      <header>
        <Search updateNameFilter={this.props.updateNameFilter} />
      </header>
    );
  }
}
