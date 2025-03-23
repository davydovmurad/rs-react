import { useCallback, useEffect, useState } from 'react';
import { COUNTRIES_URL } from './consts';
import { Country, SortValue } from './types';
import { CountriesTable } from './components/CountriesTable/CountriesTable';
import styles from './App.module.css';

const sortOptions = [
  { value: '', text: 'None' },
  { value: SortValue.PopulationAsc, text: 'Population ascending' },
  { value: SortValue.PopulationDesc, text: 'Population descending' },
  { value: SortValue.NameAsc, text: 'Name ascending' },
  { value: SortValue.NameDesc, text: 'Name descending' },
];

function App() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [regions, setRegions] = useState<string[]>([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(COUNTRIES_URL);
      const data: Country[] = await response.json();
      const regions = new Set<string>();

      data.forEach((country) => {
        regions.add(country.region);
      });
      setRegions(Array.from(regions));
      setCountries(data);
    }
    fetchData();
  }, []);

  const changeFilter = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter(event.target.value);
    },
    []
  );

  const changeSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    []
  );

  const changeSort = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSort(event.target.value);
    },
    []
  );

  return (
    <>
      <div className={styles.controls}>
        <label>
          Filter:
          <select value={filter} onChange={changeFilter}>
            <option value="">All regions</option>
            {regions.map((region) => (
              <option value={region} key={region}>
                {region}
              </option>
            ))}
          </select>
        </label>

        <label>
          Search:
          <input
            type="text"
            value={search}
            onChange={changeSearch}
            placeholder="Search countries by name"
          />
        </label>

        <label>
          Sort:
          <select value={sort} onChange={changeSort}>
            {sortOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </label>
      </div>

      {countries === null ? (
        <h1>Loading...</h1>
      ) : (
        <CountriesTable
          countries={countries}
          filter={filter}
          search={search}
          sort={sort}
        />
      )}
    </>
  );
}

export default App;
