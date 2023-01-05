import { refs } from './refs';

function createCountryListMarkup(data) {
  clearMarkup();

  return data
    .map(
      ({ flags: { svg }, name: { official } }) =>
        `
      <li class="country-list__item">
        <img src="${svg}" alt="${official}" width="60px" height="40px">
        <h2>${official}</h2>
      </li>
    `
    )
    .join('');
}

function createSingleCardMarkup({
  name: { official },
  capital,
  population,
  flags: { svg },
  languages,
}) {
  clearMarkup();
  const lang = Object.values(languages);

  return ` 
            <div class="wrapper">
              <img src="${svg}" alt="${official}" width="30" height="20"/>
              <h2 class="country-list__title">${official}</h2>
            </div>
              <p><b>Capital:</b> ${capital}</p>
              <p><b>Population:</b> ${population}</p>
              <p><b>Languages:</b> ${lang}</p>
          `;
}

function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryCard.innerHTML = '';
}

export { createSingleCardMarkup, createCountryListMarkup, clearMarkup };
