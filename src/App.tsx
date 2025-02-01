import { Component, ComponentProps, ReactNode } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { SEARCH_REQUEST_LOCAL_STORAGE_KEY } from './consts';
import './App.css';

class App extends Component<
  ComponentProps<'div'>,
  { nameFilter: string | null }
> {
  state = {
    nameFilter: localStorage.getItem(SEARCH_REQUEST_LOCAL_STORAGE_KEY),
  };

  updateNameFilter = (nameFilter: string | null): void => {
    this.setState({ nameFilter });
  };

  render(): ReactNode {
    return (
      <>
        <Header updateNameFilter={this.updateNameFilter} />
        <Main nameFilter={this.state.nameFilter} />
      </>
    );
  }
}

export default App;
