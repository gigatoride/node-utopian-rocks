const axios = require("axios"); // Promise based HTTP client.
const qs = require("querystring"); // A querystring parsing and stringifying library.
const API_URL = require("../../config.json").uri; // The current host for Utopian API.

const stats = {
  /**
   * Get all Utopian Contributors.
   * @param {string} category - Retrieve moderators from a specific category.
   * @returns {array} All posts by used parameters.
   */
  getModerators: category =>
    axios // Create get request for Utopian API host
      .get(API_URL + "/posts", {
        // Multiple parameters list to filter Contributors.
        params: {
          category: category // Any category according to that post (https://steemit.com/utopian-io/@utopian-io/utopian-now-contributions-are-welcome)
        },
        paramsSerializer: params =>
          qs
            .stringify(params, {
              // Convert a params object into a string with qs.stringify().
              indices: false // Create string without indices.
            })
            .replace(/([^=&?]+)=(&)/g, "") // Regular expression to remove empty or null parameters.
      })
      .then(function(response) {
        let moderators = []; // Moderators array
        response.data.filter(body => {
          // tests whether at least one moderator in the array passes the test implemented by the provided function.
          if (moderators.some(obj => obj.moderator === body.moderator)) {
            // returns the index of the first moderator in the array that satisfies the provided testing function. Otherwise -1 is returned.
            let objIndex = moderators.findIndex(
              obj => obj.moderator == body.moderator //  If moderator already exist in the array of objects
            );
            moderators[objIndex].reviewed++; // Count reviewed contributions by moderator
          }
          // If not exist push it into the array.
          else
            return moderator.push({
              moderator: body.moderator, // Moderator username
              reviewed: 1 // Number of reviewed contributions
            });
        });
        return moderators.sort((a, b) => b.reviewed - a.reviewed); // Sort moderators descendingly by number of reviews.
      })
      .catch(function(error) {
        return error; // Returns an error of something wrong with response.
      }),
  /**
   * All Utopian Projects
   * @param {string} category - Retrieve projects from a specific category.
   * @returns {array} All posts by used parameters.
   */
  getProjects: category =>
    axios
      .get(API_URL + "/posts", {
        // Multiple parameters list to filter Contributors.
        params: {
          category: category // Any category according to that post (https://steemit.com/utopian-io/@utopian-io/utopian-now-contributions-are-welcome)
        },
        // Convert a params object into a string with qs.stringify().
        paramsSerializer: params =>
          qs
            .stringify(params, {
              // Convert a params object into a string with qs.stringify().
              indices: false // Create string without indices.
            })
            .replace(/([^=&?]+)=(&)/g, "") // Regular expression to remove empty or null parameters.
      })
      .then(function(response) {
        let repositories = []; // Repositories Array
        // findIndex() method returns the index of the first repository in the array that satisfies the provided testing function. Otherwise -1 is returned.
        response.data.filter(body => {
          // tests whether at least one repository in the array passes the test implemented by the provided function.
          if (repositories.some(obj => obj.repository === body.repository)) {
            // returns the index of the first repository in the array that satisfies the provided testing function. Otherwise -1 is returned.
            let objIndex = repositories.findIndex(
              obj => obj.repository == body.repository
            );
            repositories[objIndex].contributions++; // Count contribution for repository.
            repositories[objIndex].total_utopian_rewards = +body.utopian_vote; // Add utopian vote value for total_utopian_rewards
          } else
            return repositories.push({
              repository: body.repository, // First repository name
              contributions: 1, // First contribution in repository
              total_utopian_rewards: body.utopian_vote // First utopian vote value
            });
        });
        return repositories.sort((a, b) => b.contributions - a.contributions); // Sort contributions descendingly by total contributions.
      })
      .catch(function(error) {
        return error; // Returns an error of something wrong with response.
      }),
  /**
   * Get all Utopian Contributors.
   * @param {string} category - Retrieve Contributors from a specific category.
   * @param {string} status -	Status to filter Contributors.
   * @param {boolean} staff_picked - Retrieve posts that were or weren't staff picked.
   * @returns {array} All posts by used parameters.
   */
  getContributors: (category, status, staff_picked) =>
    axios
      .get(API_URL + "/posts", {
        // Multiple parameters list to filter Contributors.
        params: {
          category: category, // Any category according to that post (https://steemit.com/utopian-io/@utopian-io/utopian-now-contributions-are-welcome)
          status: status, // Values unreviewed, reviewed, pending, unvoted
          staff_picked: staff_picked // Boolean value
        },
        // Convert a params object into a string with qs.stringify()
        paramsSerializer: params =>
          qs
            .stringify(params)
            .replace(/([^=&?]+)=(&)/g, "") // Regular expression to remove empty or null parameters.
      })
      .then(function(response) {
        let authors = []; // Authors array
        response.data.filter(body => {
          // tests whether at least one author in the array passes the test implemented by the provided function.
          if (authors.some(obj => obj.author === body.author)) {
            // returns the index of the first author in the array that satisfies the provided testing function. Otherwise -1 is returned.
            let objIndex = authors.findIndex(obj => obj.author == body.author);
            authors[objIndex].contributions++; // Count contributions
            authors[objIndex].total_utopian_rewards = +body.utopian_vote; // Add the utopian vote value to total_utopian_rewards
            authors[objIndex].total_staff_picked = +body.staff_picked ? 1 : 0; // Add the staff picked  to total_staff_picked
          } else
            return authors.push({
              author: body.author, // author username
              contributions: 1, // Count first contribution
              total_utopian_rewards: body.utopian_vote, // First utopian vote value
              total_staff_picked: body.staff_picked ? 1 : 0 // Is it staff_picked or not
            });
        });
        // console.log(authors);
        return authors.sort((a, b) => b.contributions - a.contributions); // Sort contributions descendingly by total contributions.
      })
      .catch(function(error) {
        return error; // Returns an error of something wrong with response.
      }),
  getModeratorsByDate: specificDate =>
    axios
      .get(API_URL + "/statistics/" + specificDate) // Get request for statistics
      .then(function(response) {
        return response.data[0].moderators; // Returns an array of objects for moderators.
      })
      .catch(function(error) {
        return error; // Returns an error of something wrong with response.
      }),
  getCategoriesByDate: specificDate =>
    axios
      .get(API_URL + "/statistics/" + specificDate) // Get request for statistics
      .then(function(response) {
        return response.data[1].categories; // Returns an array of objects for categories.
      })
      .catch(function(error) {
        return error; // Returns an error of something wrong with response.
      }),
  getProjectsByDate: specificDate =>
    axios
      .get(API_URL + "/statistics/" + specificDate) // Get request for statistics
      .then(function(response) {
        return response.data[2].projects; // Returns an array of objects for projects.
      })
      .catch(function(error) {
        return error; // Returns an error of something wrong with response.
      }),
  getStaffPicksByDate: specificDate =>
    axios
      .get(API_URL + "/statistics/" + specificDate) // Get request for statistics
      .then(function(response) {
        return response.data[3].staff_picks; // Returns an array of objects staff picks.
      })
      .catch(function(error) {
        return error; // Returns an error of something wrong with response.
      }),
  getTasksRequestsByDate: specificDate =>
    axios
      .get(API_URL + "/statistics/" + specificDate) // Get request for statistics
      .then(function(response) {
        return response.data[4].task_requests; // Returns an array of objects for task requests.
      })
      .catch(function(error) {
        return error; // Returns an error of something wrong with response.
      })
};
//Exports all functions
module.exports = stats;
