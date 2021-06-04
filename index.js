// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  if (ip) {
    console.log('It worked! Returned IP:' , ip);
  }
});

fetchCoordsByIP('216.181.48.137',(error, coordinates) => {
if(error) {
  console.log(error);
}
if(coordinates) {
  console.log(coordinates);
}
});