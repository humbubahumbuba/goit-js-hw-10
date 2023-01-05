import { refs } from './js/refs';
import './css/styles.css';
import { fetchCountries } from './js/fetch-countries';
import {
  createCountryListMarkup,
  createSingleCardMarkup,
  clearMarkup,
} from './js/create-markup';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const name = event.target.value.toLowerCase().trim();

  if (name) {
    fetchCountries(name)
      //
      .then(data => {
        console.log(data);
        if (data.length === 1) {
          refs.countryCard.innerHTML = createSingleCardMarkup(data[0]);
          //
        } else if (data.length > 1 && data.length <= 10) {
          refs.countryList.innerHTML = createCountryListMarkup(data);
          //
        } else {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      //
      .catch(error => {
        Notify.failure('Ooops, there is no country with that name.');
        clearMarkup();
      });
  } else {
    Notify.warning('Please statr typing!');
    clearMarkup();
  }
}
