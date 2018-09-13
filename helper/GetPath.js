getImagePath = function(value) {
  return value.split(`\\`)[2];
};

module.exports = getImagePath;
