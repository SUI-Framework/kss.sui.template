let fs = require('fs');

module.exports.register = (handlebars) => {
  handlebars.registerHelper('sample', function(options) {
    let obj = this;

    if (obj.sample) {
      return fs.readFileSync(obj.sample, 'utf8');
    }
  });
};
