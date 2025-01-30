import {
  ChangeEvent,
  ChangeEventHandler,
  Component,
  ComponentProps,
  MouseEventHandler,
  ReactNode,
} from 'react';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';
import styles from './Search.module.css';

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
  ) => {
    this.setState({
      searchRequest: e.target.value,
    });
  };

  handleSearchRequestSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    localStorage.setItem(
      SEARCH_REQUEST_LOCAL_STORAGE_KEY,
      this.state.searchRequest
    );
  };

  render(): ReactNode {
    return (
      <>
        <div className={styles.inputWrapper}>
          <SearchInput
            value={this.state.searchRequest}
            onChange={this.handleSearchRequestChange}
          />
        </div>
        <SearchButton onClick={this.handleSearchRequestSubmit} />
      </>
    );
  }
}
