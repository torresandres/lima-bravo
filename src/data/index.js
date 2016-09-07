const _ = require('lodash');
const path = require('path');
const mainBowerFiles = require('main-bower-files');

module.exports = function(file) {
  return _.assign(
    require('./' + path.basename(file.path).split('.')[0] + '.json'),
    {assets: {
      scripts: mainBowerFiles({filter: '**/*.js', paths: file.cwd}),
      styles: mainBowerFiles({filter: '**/*.css', paths: file.cwd}),
      fonts : [{
        family: 'Lato',
        weights: ['300', '400', '500', '700']
      }]
    }}
  );
}
