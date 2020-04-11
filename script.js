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
  // thus limiting the fetch promise to one image at a time
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

function generateErrorMsg(data) {
  console.log("generateErrorMsg ran.");
  if (data <= 0) {
    return `
      <p class="error">Don't you want to see any dogs? Please submit another number...</p>
    `;

  } else {
    return `
      <p class="error">We can only display up to 50 dog images. No more than that, I'm afraid. Please submit another number...</p>
    `;
  }
}



// RENDERING FUNCTIONS ///////////////////////////////////////

function renderDogImage(data) {
  // generate HTML to render
  const dogHTML = generateDogImage(data);

  // render HTML into DOM
  $('.js-image-gallery').append(dogHTML);
  $('.js-image-gallery').removeClass('hidden');
}

function renderErrorMsg(data) {
  const errMsg = generateErrorMsg(data);
  $('.js-image-gallery').html(errMsg);
  $('.js-image-gallery').removeClass('hidden');
}



// EVENT HANDLERS ////////////////////////////////////////////

function handleSubmission() {
  // get number submitted via form input
  $('#dog-form').submit( event => {
    event.preventDefault();
    const numDogs = $('.js-dog-generator-entry').val();
    
    // reset DOM, if a prior submission already occurred
    $('.js-image-gallery').html('');
    
    if (numDogs <= 0 || numDogs > 50) { // limit to 50 images
      renderErrorMsg(numDogs);
    } else {
      fetchDogImages(numDogs);
    }
  });
}



// on page load
$(init);