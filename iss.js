const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', function(error, response, body) {
    if (error) {
      callback(`Failed: ${error}`, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ipAddress = JSON.parse(body)['ip'];
    if (body) {
      callback(null, ipAddress);
    }

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

      callback(null, coordinates);
    }
  });
};


 const fetchISSFlyOverTimes = function(coordinates, callback) {
  request(`http://api.open-notify.org/iss-now.jsonlat=${coordinates.latitude}&lon=${coordinates.longitude}`, function(error, response, body) {
  if (error) {
    callback(error, null);
    return;
  }
console.log(body,response.statusCode)

  //if (response.statusCode !== 200) {
   // callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
    //return;
  //}

  const ISSFlyOver = JSON.parse(body)['iss_position']
  if (body) {
    callback(null, ISSFlyOver);
  }

});
 }


const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
      //console.log("It didn't work!" , error);
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null)
        //console.log(error);
      }

      fetchISSFlyOverTimes(coordinates, (error, nextPasses) =>{ ///////////////// PROBLEMM!
        if(error) {
          return callback(error, null)
          //console.log(error);
        }
        callback(null, nextPasses);
      });
    });
  });
}

module.exports = {nextISSTimesForMyLocation, fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};





/*
const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', function(error, response, body) {
    if (error) {
      callback(`Failed: ${error}`, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ipAddress = JSON.parse(body)['ip'];
    if (body) {
      callback(null, ipAddress);
    }

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

      callback(null, coordinates);
    }
  });
};


 const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-now.jsonlat=${coords.latitude}&lon=${coords.longitude}`, function(error, response, body) {
  if (error) {
    callback(error, null);
    return;
  }
console.log(body)
  //if (response.statusCode !== 200) {
  //  callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
  //  return;
  //}

  const ISSFlyOver = JSON.parse(body)['iss_position']
  if (body) {
    callback(null, ISSFlyOver);
  }

});
 }


const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
      //console.log("It didn't work!" , error);
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null)
        //console.log(error);
      }

      fetchISSFlyOverTimes({
        if(error) {
          return callback(error, null)
          //console.log(error);
        }
      });
    });
  });
}

module.exports = {nextISSTimesForMyLocation, fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};
*/