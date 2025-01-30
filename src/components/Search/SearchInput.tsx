import { Component, ComponentProps, ReactNode } from 'react';

export default class SearchInput extends Component<ComponentProps<'input'>> {
  render(): ReactNode {
    return <input type="text" placeholder="Search" {...this.props} />;
  }
}
