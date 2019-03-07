'use strict';

const apiKey = "Zr0S27a7DvoEnaDaAY30QC6Lehvz1lg7YITO8OKf"; 
const searchURL = "https://developer.nps.gov/api/v1/parks";


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParks(query, maxResults=10) {
  const params = {
    stateCode: query,
    limit: maxResults,
    api_key: apiKey
  };

  // const options = {
  //   headers: new Headers({
  //     "X-Api-Key": apiKey})
  // };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  console.log(responseJson);

  // if there are previous results, remove them
  $('li').remove();

  // iterate through the response data array
  for (let i = 1; i < responseJson.data.length; i++){

    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href=${responseJson.data[i].url}>${responseJson.data[i].url}</a>
      </li>`
    )};
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);