export async function fetchCountries() {
  const response = await fetch(process.env.REACT_APP_FETCH_COUNTRY
  );
  const data = await response.json();
  return data
    .map((city) => city.country)
    .filter((value, index, self) => self.indexOf(value) === index);
}
