'use strict';
/* eslint-disable indent */

// API doc: https://dog.ceo/dog-api/documentation/

function init() {
  fetchAllBreeds();               // to populate dropdown menu
  handleSubmission();
  handleRefresh();
}

//////////////////////////////////////////////////////////////
// SEPERATION OF CONCERNS: TYPES OF FUNCTIONS
// (Miscellaneous): Fetch Data
// Template Generators
// Rendering Functions
// Event Handlers
//////////////////////////////////////////////////////////////


// MISCELLANEOUS /////////////////////////////////////////////

function fetchAllBreeds() {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
      renderDropdown(data.message);
    })
    .catch(err => console.log('error fetchAllBreeds'));
}

function fetchDogImage(breed) {
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => {
      // NOTE: The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or if anything prevented the request from completing.
      // The good is news is fetch provides a simple ok flag that indicates whether an HTTP response’s status code is in the successful range or not. 
      // SOLUTION thanks to: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
      if (!response.ok) {
        errorHideElements();
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => renderDogImage(data.message))
    .catch(err => console.log('ERROR: that breed doesn\'t exist'));
}


function errorHideElements() {
  $('#dog-form button').addClass('hidden');
  $('.js-image-gallery').addClass('hidden');
}


// TEMPLATE GENERATORS ///////////////////////////////////////

function generateBreedOptions(breeds) {
  // create a new array extracting all the keys 
  // within the data.message object
  const options = Object.keys(breeds).map(breed => {
    return `<option value="${breed}">${breed}</option>`;
  });

  return `
    <option value="" disabled selected>select dog breed</option>
    <option value-"breed that doesn't exist">breed that doesn't exist (throw error)</option>
    ${options}
  `;
}

function generateDogImage(data) {
  return `
    ${data}
  `;
  /*
  return `
    <img src="${data}" class="">
  `;
  */
}



// RENDERING FUNCTIONS ///////////////////////////////////////

function renderDropdown(breeds) {
  const dropdownHTML = generateBreedOptions(breeds);
  $('#js-breed').html(dropdownHTML);
}

function renderDogImage(data) {
  // generate HTML to render
  const dogHTML = generateDogImage(data);

  // render HTML into DOM
  $('.js-dog-image').attr('src', dogHTML);
  $('.js-dog-image').removeClass('hidden');
  $('#dog-form button').removeClass('hidden');
}



// EVENT HANDLERS ////////////////////////////////////////////

function handleSubmission() {
  $('#dog-form').on('change', event => {
    const selectedBreed = $('#js-breed').val();
    fetchDogImage(selectedBreed);
  });
}

function handleRefresh() {
  $('#dog-form').submit( event => {
    event.preventDefault();
    const selectedBreed = $('#js-breed').val();
    fetchDogImage(selectedBreed);
  });
}



// on page load
$(init);