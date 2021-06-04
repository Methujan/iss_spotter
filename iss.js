/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', function(error, response, body) {
    if (error) {
      callback(`Failed: ${error}`, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ipAddress = JSON.parse(body)['ip'];
    if (body) {
      callback(null, ipAddress);
    }
  //console.error('error:', error); // Print the error if one occurred
  //console.log('body:',typeof ipAddress, ipAddress);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
 
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ipForCoords = JSON.parse(body);
    if (body) {
    
      const coordinates = {
        latitude: ipForCoords['latitude'].toString(),
        longitude: ipForCoords['longitude'].toString()
      };
      console.log(coordinates);
   
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
