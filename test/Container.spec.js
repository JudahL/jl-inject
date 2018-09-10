const Container = require('../src/Container');

/**
 * Tests
 */
describe('Container', () => {
  it('is exported as a module', () => {
    expect(Container).toBeDefined();
  });

  describe('Container.addBinding', () => {
    it('can add a new binding', () => {
      const container = new Container();
      const type = 'testType';

      container.addBinding(type, 'testBinding');
      expect(container.bindings.get(type)).toBe('testBinding');
    });
  });

  describe('Container.bind', () => {
    it('Returns a new Binder to set up a new binding with the given type', () => {
      const container = new Container(TestBinder);
      const type = 'testType';

      expect(container.bind(type) instanceof TestBinder).toBe(true);
    });

    it('Throws an error if the given type is already bound', () => {
      const container = new Container(TestBinder);
      const type = 'testType';

      container.addBinding(type, 'testBinding');

      function attemptToBindAlreadyBoundType() {
        container.bind(type)
      }

      expect(attemptToBindAlreadyBoundType).toThrow('Type already bound');
    });
  });

  describe('Container.hasBinding', () => {
    it('Returns TRUE if the container has a binding with the specified type', () => {
      const container = new Container();
      const type = 'testType';

      container.addBinding(type, 'testBinding');
      expect(container.hasBinding(type)).toBe(true);
    });

    it('Returns FALSE if the container does not have a binding with the specified type', () => {
      const container = new Container();

      expect(container.hasBinding('testType2')).toBe(false);
    });
  });

  describe('Container.resolveBinding', () => {
    it('can resolve a binding type', () => {
      const container = new Container();
      const type = 'testType';

      container.addBinding(type, new TestBinding());
      const testInstance = container.resolveBinding(type);
      expect(testInstance).toEqual(true);
    });

    it('throws an error if an undefined binding is resolved', () => {
      const container = new Container();
      const testType = 'testType'

      function attemptToResolveUndefinedBinding() {
        container.resolveBinding(testType);
      }

      expect(attemptToResolveUndefinedBinding).toThrow('binding not defined: ' + testType);
    });
  });

  describe('Container.resolveDependencies', () => {
    it('can resolve a single dependency', () => {
      const container = new Container();
      const testDependencies = ['test1'];

      container.addBinding('test1', new TestBinding());

      const resolved = container.resolveDependencies(testDependencies);
      expect(resolved).toEqual([true]);
    });

    it('can resolve mulitple dependencies', () => {
      const container = new Container();
      const testDependencies = ['test1', 'test2'];

      container.addBinding('test1', new TestBinding());
      container.addBinding('test2', new TestBinding());

      const resolved = container.resolveDependencies(testDependencies);
      expect(resolved).toEqual([true, true]);
    });

    it('returns an empty array if no dependencies are provided', () => {
      const container = new Container();

      container.addBinding('test1', new TestBinding());

      const resolved = container.resolveDependencies();
      expect(resolved).toEqual([]);
    });
  });

});


/**
 * Mock
 */
class TestBinder {
  constructor(container, type) {
    this.container = container;
    this.type = type;
  }
}

class TestBinding {
  resolve(container) {
    return true;
  }
}
