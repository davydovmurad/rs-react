import { useState } from 'react';

const CountryAutocomplete = ({
  countries,
  ...props
}: React.ComponentPropsWithRef<'input'> & { countries: string[] }) => {
  const [query, setQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(event);
    }
    const value = event.target.value;
    setQuery(value);

    const filtered = countries.filter((country) =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleSelectCountry = (country: string) => {
    setQuery(country);
    setFilteredCountries([]);
  };

  return (
    <>
      <input
        type="text"
        value={query}
        {...props}
        onChange={handleInputChange}
        placeholder="Search for a country..."
      />

      {filteredCountries.length > 0 && query && (
        <ul>
          {filteredCountries.map((country, index) => (
            <li key={index} onClick={() => handleSelectCountry(country)}>
              {country}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CountryAutocomplete;
