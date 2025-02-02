import { Component, ComponentProps, ReactNode } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ErrorButton from './components/ErrorButton';
import { SEARCH_REQUEST_LOCAL_STORAGE_KEY } from './consts';
import './App.css';

interface AppState {
  nameFilter: string | null;
}
class App extends Component<ComponentProps<'div'>, AppState> {
  state: AppState = {
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
        <ErrorButton />
      </>
    );
  }
}

export default App;
