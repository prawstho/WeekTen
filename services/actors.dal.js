const dal = require("./db");

//get all actors.
var getActors = function() {
  if(DEBUG) console.log("actors.dal.getActors()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT actor_id, first_name, last_name FROM actor \
        ORDER BY actor_id DESC LIMIT 7;"
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
    const sql = "SELECT actor_id, first_name, last_name FROM actor WHERE actor_id = $1";
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

var addActor = function(fname, lname) {
  if(DEBUG) console.log("actors.dal.addActor()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.actor(first_name, last_name) \
        VALUES ($1, $2);";
    dal.query(sql, [fname, lname], (err, result) => {
      if (err) {
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
    addActor,
}