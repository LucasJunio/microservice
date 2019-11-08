// cors.js
module.exports = function() {
  return function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Content-Type", "application/x-www-form-urlencoded");
    res.header("Accept", "application/json");
    next();
  };
};
