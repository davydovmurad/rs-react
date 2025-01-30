import { Component, ComponentProps, ReactNode } from 'react';

export default class SearchButton extends Component<ComponentProps<'button'>> {
  render(): ReactNode {
    return <button {...this.props}>Search</button>;
  }
}
