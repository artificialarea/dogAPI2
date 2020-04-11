'use strict';
/* eslint-disable indent */

// API doc: https://dog.ceo/dog-api/documentation/

function init() {
  handleSubmission();

}

//////////////////////////////////////////////////////////////
// SEPERATION OF CONCERNS: TYPES OF FUNCTIONS
// (Miscellaneous): Fetch Data
// Template Generators
// Rendering Functions
// Event Handlers
//////////////////////////////////////////////////////////////


// MISCELLANEOUS /////////////////////////////////////////////

function fetchDogImages(num) {
  // fetch then render each dog/img *individually* to the DOM
  // limiting the fetch promise to one image, not several
  for (let i = 1; i <= num; i++) {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        renderDogImage(data.message);
      })
      .catch(err => console.log('error'));
  }
}



// TEMPLATE GENERATORS ///////////////////////////////////////

function generateDogImage(data) {
  // generate a (single) dog image
  return `
    <img src="${data}" class="">
  `;
}



// RENDERING FUNCTIONS ///////////////////////////////////////

function renderDogImage(data) {
  // generateDogCollection HTML
  const dogHTML = generateDogImage(data);

  // render HTML into DOM
  $('.js-image-gallery').append(dogHTML);
  $('.js-image-gallery').removeClass('hidden');
}

function renderError() {
  // if submission is outside parameters of 1-50, throw error
}



// EVENT HANDLERS ////////////////////////////////////////////

function handleSubmission() {
  // get number submitted via form input
  $('#dog-form').submit( event => {
    event.preventDefault();
    const numDogs = $('.js-dog-generator-entry').val();
    
    // reset DOM, if a prior submission already occurred
    $('.js-image-gallery').html('');
    
    if (numDogs <= 0 || numDogs > 50) {
      // throw an error
      // renderError() ?
    } else {
      fetchDogImages(numDogs);
    }
  });
}




// on page load
$(init);