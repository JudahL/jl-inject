const Binding = require('./Binding');

/** Class representing a DI Container */
class Container {
  /** 
   * Creates a new DI Container
   * @param {function} Binder - The Binder constructor to use for creating new bindings
   */
  constructor(Binder) {
    this.Binder = Binder;

    /** @type {Object<string, Binding>} */
    this.bindings = new Map();
  }

  /**
   * Creates a new binding using a Binder
   * @param {string} type - The binding type key
   */
  bind(type) {
    if (this.hasBinding(type)) {
      throw new Error('Type already bound');
    }

    return new this.Binder(this, type);
  }

  /**
   * Adds a new binding, should only be called by a binder
   * @param {string} type - The binding type key
   * @param {Binding} binding - The binding instance
   */
  addBinding(type, binding) {
    this.bindings.set(type, binding);
  }

  /**
   * Returns whether the specified type has been bound or not
   * @param {string} type - The binding type to check
   */
  hasBinding(type) {
    return this.bindings.has(type);
  }

  /**
   * Resolve the binded for the specified type and return the resolved instance
   * @param {string} type - The dependency type to be resolved
   */
  resolveBinding(type) {
    /** @type {Binding} */
    const binding = this.bindings.get(type);

    if (!binding) {
      throw new Error('binding not defined: ' + type);
    }

    return binding.resolve(this);
  }

  /**
   * Resolve all dependency bindings and return the resolved dependency instances
   * @param {string[]} dependencies - The dependency types to be resolved
   */
  resolveDependencies(dependencies) {
    if (!dependencies || !dependencies.map) return [];

    const resolvedDependencies = dependencies.map(dep => this.resolveBinding(dep));
    return resolvedDependencies;
  }
}

module.exports = Container;