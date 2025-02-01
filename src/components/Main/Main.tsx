import { Component, ReactNode } from 'react';
import CardList from '../Card/CardList/CardList';
import { Pokemon } from '../../models';
import PokemonApiService from '../../api';
import Loader from '../../ui/Loader/Loader';
import styles from './Main.module.css';

interface MainState {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

export default class Main extends Component<
  { nameFilter: string | null },
  MainState
> {
  state: MainState = {
    pokemons: [],
    isLoading: true,
    error: null,
  };

  async componentDidMount(): Promise<void> {
    let pokemons: Pokemon[] = [];
    try {
      pokemons =
        (await new PokemonApiService().getPokemons(this.props.nameFilter)) ||
        [];
    } catch (error) {
      this.setState({ error: String(error) });
    }
    this.setState({
      pokemons,
      isLoading: false,
    });
  }

  async componentDidUpdate(prevProps: { nameFilter: string | null }) {
    if (prevProps.nameFilter === this.props.nameFilter) {
      return;
    }
    await this.componentDidMount();
  }

  render(): ReactNode {
    return (
      <section className={styles.main}>
        {this.state.error && <p>Failed to fetch</p>}

        {!this.state.error &&
          (this.state.isLoading ? (
            <Loader />
          ) : (
            <CardList pokemons={this.state.pokemons} />
          ))}
      </section>
    );
  }
}
