const path = require('path');

module.exports = function(file) {
  return _.assign(
    require('./_default.json'),
    require('./' + path.basename(file.path).split('.')[0] + '.json')
  );
}
