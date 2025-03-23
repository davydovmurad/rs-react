import { useEffect, useMemo, useState } from 'react';
import { LS_VISITED_COUNTRIES_KEY } from '../../consts';
import { Country, SortValue } from '../../types';
import { CountryRow } from '../CountryRow/CountryRow';
import styles from './CountriesTable.module.css';

interface CountriesTableProps {
  countries: Country[];
  filter: string;
  search: string;
  sort: string;
}

const filterCountries = (
  countries: Country[],
  filter: string,
  search: string,
  sort: string,
  visitedCountries: string[]
) => {
  let filteredCountries = countries.map((country) => ({
    ...country,
    visited: visitedCountries.includes(country.name.common),
  }));

  if (filter)
    filteredCountries = filteredCountries.filter(
      (country) => country.region === filter
    );
  if (search)
    filteredCountries = filteredCountries.filter((country) =>
      country.name.common.toUpperCase().includes(search.toUpperCase())
    );
  switch (sort) {
    case SortValue.PopulationAsc:
      filteredCountries = filteredCountries.sort(
        (a, b) => a.population - b.population
      );
      break;
    case SortValue.PopulationDesc:
      filteredCountries = filteredCountries.sort(
        (a, b) => b.population - a.population
      );
      break;
    case SortValue.NameAsc:
      filteredCountries = filteredCountries.sort((a, b) =>
        a.name.common.toUpperCase() < b.name.common.toUpperCase() ? -1 : 1
      );
      break;
    case SortValue.NameDesc:
      filteredCountries = filteredCountries.sort((a, b) =>
        a.name.common.toUpperCase() < b.name.common.toUpperCase() ? 1 : -1
      );
      break;
    default:
      break;
  }
  return filteredCountries;
};

export const CountriesTable = ({
  countries,
  filter,
  search,
  sort,
}: CountriesTableProps) => {
  const [visitedCountries, setVisitedCountries] = useState<string[]>(
    JSON.parse(localStorage.getItem(LS_VISITED_COUNTRIES_KEY) || '[]')
  );
  const filteredCountries = useMemo(
    () => filterCountries(countries, filter, search, sort, visitedCountries),
    [countries, filter, search, sort, visitedCountries]
  );

  useEffect(() => {}, [countries, filter, search, sort, visitedCountries]);

  const changeVisitCountry = (
    event: React.ChangeEvent<HTMLInputElement>,
    country_name: string
  ) => {
    let visitedCountries: string[] = JSON.parse(
      localStorage.getItem(LS_VISITED_COUNTRIES_KEY) || '[]'
    );

    visitedCountries = event.target.checked
      ? [...visitedCountries, country_name]
      : visitedCountries.filter((e) => e !== country_name);

    if (visitedCountries.length) {
      localStorage.setItem(
        LS_VISITED_COUNTRIES_KEY,
        JSON.stringify(visitedCountries)
      );
    } else {
      localStorage.removeItem(LS_VISITED_COUNTRIES_KEY);
    }
    setVisitedCountries(visitedCountries);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Popiulation</th>
          <th>Region</th>
          <th>Flag</th>
          <th>Visited</th>
        </tr>
      </thead>

      <tbody>
        {filteredCountries.map((country) => (
          <CountryRow
            key={country.name.common}
            country={country}
            changeVisitCountry={changeVisitCountry}
          />
        ))}
      </tbody>
    </table>
  );
};
