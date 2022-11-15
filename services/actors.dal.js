const dal = require("./db");

//get all actors.
var getActors = function() {
  if(DEBUG) console.log("actors.dal.getActors()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT first_name, last_name FROM actor;"
    dal.query(sql, [], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

var getActorByActorId = function(id) {
  if(DEBUG) console.log("actors.dal.getActorByActorId()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT first_name, last_name FROM actor WHERE actor_id = $1";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

module.exports = {
    getActors,
    getActorByActorId,
}