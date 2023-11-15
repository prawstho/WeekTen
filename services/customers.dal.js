const dal = require("./db");

//get all staff members.
var getCustomers = function() {
  if(DEBUG) console.log("customers.dal.getCustomers()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT * FROM customer_info";
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
    getCustomers,
}