const axios = require('axios'); // Promise based HTTP client.
const qs = require('qs'); // A querystring parsing and stringifying library.
const API_URL = require('../config.json').uri; // The current host for Utopian API.

let endpoints = {
  stats: require('./lib/stats')
}; // JS object for API endpoints. 

/**
 * Get all utopian contributions.
 * @param {string} category - Retrieve posts from a specific category.
 * @param {string} status -	Status to filter contributions.
 * @param {string} author -	Retrieve posts by a specific author.
 * @param {string} moderator -	Retrieve posts reviewed by a specific moderator.
 * @param {boolean} staff_picked -	Retrieve posts that were or weren't staff picked.
 * @returns {array} All posts by used parameters.
 */
endpoints.getPosts = (category, status, author, moderator, staff_picked) => axios.get(API_URL + '/posts', {
    // Multiple parameters list to filter contributions.
    params: {
      category: category, // Any category according to that post (https://steemit.com/utopian-io/@utopian-io/utopian-now-contributions-are-welcome)
      status: status, // Values unreviewed, reviewed, pending, unvoted
      author: author, // Author Steem username
      moderator: moderator, // Moderator Steem username
      staff_picked: staff_picked // Boolean value
    },
    // Convert a params object into a string with qs.stringify(), then regular expression to remove empty or null parameters.
    paramsSerializer: params => qs.stringify(params, {
      indices: false
    }).replace(/([^=&?]+)=(&)/g, '')
  }).then(function (response) {
    return response.data; // Returns an array of object contains all contributions.
  })
  .catch(function (error) {
    return error; // Returns an error of something wrong with response.
  });
/**
 * Get all Utopian moderators usernames.
 * @returns {array} Total Utopian moderators.
 */
endpoints.getModerators = () => axios.get(API_URL + '/moderators') //requesting moderators endpoint
  .then(function (response) {
    return response.data; // Returns an object contains all moderators usernames.
  })
  .catch(function (error) {
    return error; // Returns an error of something wrong with response.
  });
/**
 * Check username if a moderator.
 * @returns {boolean} true or false.
 */
endpoints.isModerator = (username) => axios.get(API_URL + '/moderators') // Requesting moderators endpoint
  .then(function (response) {
    return response.data.includes(username) // Returns true or false.
  })
  .catch(function (error) {
    return error; // Returns an error of something wrong with response.
  });
//Exports all endpoints
module.exports = endpoints;