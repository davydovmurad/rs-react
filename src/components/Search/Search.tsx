import {
  ChangeEvent,
  ChangeEventHandler,
  Component,
  ComponentProps,
  MouseEventHandler,
  ReactNode,
} from 'react';
import SearchButton from './SearchButton/SearchButton';
import SearchInput from './SearchInput/SearchInput';

const SEARCH_REQUEST_LOCAL_STORAGE_KEY: string = 'searchRequest';

interface SearchState {
  searchRequest: string;
}

export default class Search extends Component<
  ComponentProps<'div'>,
  SearchState
> {
  state: SearchState = {
    searchRequest: localStorage.getItem(SEARCH_REQUEST_LOCAL_STORAGE_KEY) || '',
  };

  handleSearchRequestChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    this.setState({
      searchRequest: e.target.value,
    });
  };

  handleSearchRequestSubmit: MouseEventHandler<HTMLButtonElement> =
    (): void => {
      localStorage.setItem(
        SEARCH_REQUEST_LOCAL_STORAGE_KEY,
        this.state.searchRequest
      );
    };

  render(): ReactNode {
    return (
      <>
        <SearchInput
          value={this.state.searchRequest}
          onChange={this.handleSearchRequestChange}
        />
        <SearchButton onClick={this.handleSearchRequestSubmit} />
      </>
    );
  }
}
