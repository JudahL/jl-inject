
/** Class representing a DI Binding */
class Binding {
  /**
   * Creates a new binding
   * @param {function} resolution - The constructor with which to resolve the binding
   * @param {string[]} dependencies - The dependency type keys
   */
  constructor(resolution, dependencies) {
    this.resolution = resolution;
    this.dependencies = dependencies;
  }

  /**
   * Resolves the binding, returning the instance with injected dependencies
   * @param {Class} container - The container with which to resolve the dependencies
   */
  resolve(container) {
    if (!this.instance) {
      this.instance = new this.resolution(...container.resolveDependencies(this.dependencies));
    }
    return this.instance;
  }
}

module.exports = Binding;