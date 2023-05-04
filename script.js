const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("input", displayCitiesOrStates);

const citiesStates = [];

fetch(
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
)
  .then((response) => response.json())
  .then((citiesData) => {
    citiesStates.push(...citiesData);
  });

const findCitiesOrStates = (searchValue, citiesStates) => {
  return citiesStates.filter((cityState) => {
    return (
      cityState.city.toLowerCase().includes(searchValue.toLowerCase()) ||
      cityState.state.toLowerCase().includes(searchValue.toLowerCase())
    );
  });
};
function displayCitiesOrStates() {
  const findArray = findCitiesOrStates(this.value, citiesStates);

  const matchElt = findArray
    .map((place) => {
      const regX = new RegExp(this.value, "gi"); //  /this.value/gi

      const cityName = place.city.replace(
        regX,
        `<span class="highlight">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regX,
        `<span class="highlight">${this.value}</span>`
      );

      return `<li class="name">${cityName}, ${stateName}, ${place.population}(population)</li>`;
    })
    .join("");

  suggestions.innerHTML = matchElt;
  if (searchInput.value == "") {
    suggestions.innerHTML = "";
  }
}
