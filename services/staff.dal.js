const dal = require("./db");

//get all staff members.
var getStaff = function() {
  if(DEBUG) console.log("staff.dal.getStaff()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM staff_info"
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

module.exports = {
    getStaff,
}