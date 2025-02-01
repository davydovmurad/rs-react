import { Component, ComponentProps, ReactNode } from 'react';
import './SearchButton.module.css';

export default class SearchButton extends Component<ComponentProps<'button'>> {
  render(): ReactNode {
    return <button {...this.props}>Search</button>;
  }
}
