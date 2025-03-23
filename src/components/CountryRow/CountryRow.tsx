import { memo } from 'react';
import { Country } from '../../types';
import styles from './CountryRow.module.css';

interface CountryRowProps {
  country: Country;
  changeVisitCountry: (
    event: React.ChangeEvent<HTMLInputElement>,
    countryName: string
  ) => void;
}

const CountryRowComponent = ({
  country,
  changeVisitCountry,
}: CountryRowProps) => {
  return (
    <tr
      key={country.name.common}
      className={country.visited ? styles.visited : ''}
    >
      <td>{country.name.common}</td>
      <td>{country.population}</td>
      <td>{country.region}</td>
      <td>{country.flag}</td>
      <td>
        <input
          type="checkbox"
          checked={country.visited}
          onChange={(event) => changeVisitCountry(event, country.name.common)}
        />
      </td>
    </tr>
  );
};

export const CountryRow = memo(CountryRowComponent);
