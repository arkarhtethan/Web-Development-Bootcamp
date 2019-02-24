//jshint esversion:6

// When you require this file and assign it to a variable, the exported value is what is assigned on the right hand side.
// module.exports = "hello world";

// Remember that if you add the parenthesis, you'll run the function.
// module.exports = getDate;

// Modules also have functions so you can do
exports.getDate = function() {

  var options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };

  var today = new Date();
  return today.toLocaleDateString("en-US", options);

};

exports.getDay = function() {

  var options = {
    weekday: 'long'
  };

  var today = new Date();
  return today.toLocaleDateString("en-US", options);

};
