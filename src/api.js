const axios = require('axios'); // Promise based HTTP client.
const qs = require('qs'); // A querystring parsing and stringifying library.
const API_URL = "https://utopian.rocks/api"; // The current host for Utopian API.

let endpoints = {}; // JS object for API endpoints.
/**
 * Get all utopian contributions.
 * @param {string} category - Retrieve posts from a specific category.
 * @param {string} status -	Status to filter contributions.
 * @param {string} author -	Retrieve posts by a specific author.
 * @param {string} moderator -	Retrieve posts reviewed by a specific moderator.
 * @param {boolean} staff_picked -	Retrieve posts that were or weren't staff picked.
 * @returns {object} All posts by used parameters.
 */
endpoints.getPosts = (category, status, author, moderator, staff_picked) => axios.get(API_URL + '/posts', {
  // Multiple parameters list to filter contributions.
  params: {
    category: category, // Any category according to that post (https://steemit.com/utopian-io/@utopian-io/utopian-now-contributions-are-welcome)
    status: status, // Values unreviewed,reviewed,pending,unvoted
    author: author, // Author Steem username
    moderator: moderator, // Moderator Steem username
    staff_picked: staff_picked // Boolean
  },
  paramsSerializer: function (params) {
    // Stringifying parameters using querystring parsing.
    return qs.stringify(params, { indices: false }).replace(/([^=&?]+)=(&)/g, ''); // A regular expression to remove empty or null parameters.
  }
}).then(function (response) {
  return response.data; // Returns an object contains all contributions.
})
  .catch(function (error) {
    return error; // Returns an error of something wrong with response.
  });
/**
 * Get all Utopian moderators usernames.
 * @returns {object} Total Utopian moderators.
 */
endpoints.getModerators = () => axios.get(API_URL + '/moderators') //requesting moderators endpoint
  .then(function (response) {
    return response.data; // Returns an object contains all moderators usernames.
  })
  .catch(function (error) {
    return error; // Returns an error of something wrong with response.
  });
/**
 * Get all Utopian statistics by date or today.
 * @param {string} specificDate
 * @returns {object}
 */
endpoints.getStats = (specificDate, section) => axios.get(API_URL + '/statistics/' + specificDate)
  .then(function (response) {
    switch (section) {
      case 'moderators':
        return response.data[0]; // Returns an object.
        break;
      case 'categories':
        return response.data[1]; // Returns an object.
        break;
      case 'projects':
        return response.data[2]; // Returns an object.
        break;
      case 'staff_picks':
        return response.data[3]; // Returns an object.
        break;
      case 'task_requests':
        return response.data[4]; // Returns an object.
        break;
      default:
        return response.data; // Returns an object for all statistics sections.
    }
  })
    .catch(function (error) {
      return error; // Returns an error of something wrong with response.
    });
//Exports all endpoints
module.exports = endpoints;