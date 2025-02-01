import {
  ChangeEvent,
  ChangeEventHandler,
  Component,
  MouseEventHandler,
  ReactNode,
} from 'react';
import SearchButton from './SearchButton/SearchButton';
import SearchInput from './SearchInput/SearchInput';
import { SEARCH_REQUEST_LOCAL_STORAGE_KEY } from '../../consts';

interface SearchState {
  searchRequest: string;
}

export default class Search extends Component<
  { updateNameFilter: (name: string | null) => void },
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
      const searchRequest = this.state.searchRequest.trim();
      localStorage.setItem(SEARCH_REQUEST_LOCAL_STORAGE_KEY, searchRequest);
      this.setState({
        searchRequest: searchRequest,
      });
      this.props.updateNameFilter(searchRequest);
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
