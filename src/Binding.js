const Container = require('./Container');

/** Class representing a DI Binding */
class Binding {
  /**
   * Creates a new binding
   * @param {*} resolution - The constructor with which to resolve the binding
   * @param {string[]} dependencies - The dependency type keys
   */
  constructor(resolution, dependencies) {
    this.resolution = resolution;
    this.dependencies = dependencies;

    this.type = this.types.transient;
  }

  /** Sets the resolve type to be transient (A new instance is created every time when resolving) */
  setAsTransientInstance() {
    this.type = this.types.transient;
  }

  /** Sets the resolve type to be singleton (Only one instance is created when resolving) */
  setAsSingleInstance() {
    this.type = this.types.single;
  }

  /** Returns whether the binding type is set to always reinstantiate an instance when resolving */
  isTransient() {
    return this.type === this.types.transient;
  }

  /** Returns whether the binding is set to always reuse a previously resolved instance if possible */
  isSingle() {
    return this.type === this.types.single;
  }

  /**
   * Resolves the binding, returning the instance with injected dependencies
   * @param {Container} container - The container with which to resolve the dependencies
   */
  resolve(container) {

    if (!this.instance || this.isTransient()) {
      this.instance = new this.resolution(...container.resolveDependencies(this.dependencies));
    }

    return this.instance;
  }
}

Binding.prototype.types = {
  transient: 'transientInstance',
  single: 'singleInstance',
};

module.exports = Binding;