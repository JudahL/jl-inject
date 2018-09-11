const Container = require('./src/Container');
const Binder = require('./src/Binder');
const Binding = require('./src/Binding');

module.exports.createContainer = function () {
  return new Container(createBinder);
};

function createBinder(container, type) {
  return new Binder(Binding, container, type);
}
