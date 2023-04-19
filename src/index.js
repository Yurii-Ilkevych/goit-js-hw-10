import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(callFetch, DEBOUNCE_DELAY));

function callFetch() {
  const name = refs.searchBox.value.trim();
  if (name === '') {
    clearMurcup();
    return;
  }
  clearMurcup();

  fetchCountries(name)
    .then(processingCountriesList)
    .catch(anserError);
}

function processingCountriesList(name) {
  if (name.length >= 10) {
    anserWarning();
    return;
  } else if (name.length > 1 && name.length < 10) {
    renderCountriesList(name);
  } else {
    renderOneCountryList(name);
  }
}

function renderCountriesList(name) {
  name.map(({flags, name}) => {
    const murcup = `<div class="list-item"><img src="${flags.svg}" width="30"height="20" alt=""><li>${name.official}</li></ul></div>`;
    refs.countryList.innerHTML += murcup;
  });
}

function renderOneCountryList(name) {

name.map(({flags, name, capital, population, languages}) => {  
    const murcup = `<div class="tittle-item"><img src="${flags.svg}" width="30" height="20"alt="">
      <h2 class="first-text">${name.official}</h2></div>
      <p class="second-text"><span class="flat-text">Capital:</span>${capital}</p>
      <p class="second-text"><span class="flat-text">Population:</span>${population}</p>
      <p class="second-text"><span class="flat-text">Languages:</span>${Object.values(languages).join(', ')}</p>`;

    refs.countryList.innerHTML = murcup;
})}

function anserWarning() {
  Notify.info('Too many matches found. Please enter a more specific name.', {
    position: 'center-top',
    timeout: 2250,
    fontSize: '20px',
    borderRadius: '15px',
  });
}

function anserError() {
  Notify.failure('Oops, there is no country with that name', {
    position: 'center-top',
    timeout: 2250,
    fontSize: '20px',
    borderRadius: '15px',
  });
}

function clearMurcup() {
  refs.countryList.innerHTML = '';
}
