const Binding = require('./Binding');

/** Class representing a DI Container */
class Container {
  /** Creates a new DI Container */
  constructor() {
    this.bindings = new Map();
  }

  /**
   * Creates a new binding
   * @param {string} type - The binding type key
   * @param {function} resolution - The constructor to resolve with
   * @param {string[]} dependencies - The dependency type keys
   */
  bind(type, resolution, dependencies) {
    this.bindings.set(type, new Binding(resolution, dependencies));
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
    const binding = this.bindings.get(type);

    if (!binding) {
      throw new Error('binding not defined');
    }

    return binding.resolve(this);
  }

  /**
   * Resolve all dependency bindings and return the resolved dependency instances
   * @param {string[]} dependencies - The dependency types to be resolved
   */
  resolveDependencies(dependencies) {
    if (!dependencies) return [];

    const resolvedDependencies = dependencies.map(dep => this.resolveBinding(dep));
    return resolvedDependencies;
  }
}

module.exports = Container;