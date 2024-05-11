export async function fetchCountries() {
  const response = await fetch(
    "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
  );
  const data = await response.json();
  return data
    .map((city) => city.country)
    .filter((value, index, self) => self.indexOf(value) === index);
}
