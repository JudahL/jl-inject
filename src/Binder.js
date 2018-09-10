const Binding = require('./Binding');
const Container = require('./Container');

/** Class for setting up a new binding */
class Binder {
  /**
   * Creates a new Binder that sets up a new binding for a container
   * @param {function} Binding - The constructor for instantiating a new Binding
   * @param {Container} container - The DI Container that the binding is being added to 
   * @param {string} type - The binding type key to bind to
   */
  constructor(Binding, container, type) {
    this.Binding = Binding;
    this.container = container;
    this.type = type;
  }

  /**
   * Binds the type to a resolution with or without dependencies
   * @param {*} resolution - The class constructor or value to use when resolving
   * @param {string[]} dependencies - The dependency type keys
   */
  to(resolution, dependencies) {
    this.binding = new this.Binding(resolution, dependencies);
    this.container.addBinding(this.type, this.binding);

    //Return a resolve type setter object with methods for setting the type on the binding
    return asSetter(this.binding);
  }
}

/**
 * Returns an object that has methods for setting the resolve type on a Binding, to be called by the user after to() has been called
 * @param {Binding} binding - The binding to set the resolve type on
 */
function asSetter(binding) {
  return ({
    asSingleInstance: function () {
      binding.setAsSingleInstance();
    },
    asTransientInstance: function () {
      binding.setAsTransientInstance();
    }
  });
}

module.exports = Binder;