const Binding = require('../src/Binding');

/**
 * Tests
 */
describe('Binding', () => {
  it('is exported as a module', () => {
    expect(Binding).toBeDefined();
  });

  it('can accept a class constructor as a constructor argument', () => {
    const binding = new Binding(Test);

    expect(new binding.resolution() instanceof Test).toBe(true);
  });

  it('can accept dependency keys as a constructor argument', () => {
    const binding = new Binding(Test, ['test2', 'test3', 'test4']);

    expect(binding.dependencies.length).toBe(3);
    expect(typeof binding.dependencies[0]).toBe('string');
  });

  describe('Binding.resolve', () => {
    it('can resolve with no dependencies', () => {
      const binding = new Binding(Test);
      const testContainer = {
        resolveDependencies: function () {
          return [];
        }
      }

      const resolvedBinding = binding.resolve(testContainer);
      expect(resolvedBinding.test).toBe('tested');
    });

    it('can resolve with dependencies', () => {
      const dep1 = 'dep1', dep2 = 'dep2';
      const binding = new Binding(DependencyTest, [dep1, dep2]);
      const testContainer = {
        resolveDependencies: function (dependencies) {
          return dependencies;
        }
      }

      const resolvedBinding = binding.resolve(testContainer);
      expect(resolvedBinding.dependencyOne).toBe(dep1);
      expect(resolvedBinding.dependencyTwo).toBe(dep2);
    });
  });

  describe('Binding resolve type setting and getting', () => {
    it('sets the binding resolve type to the correct status and the corresponding get method returns true when the type has been set', () => {
      const binding = new Binding();

      binding.setAsSingleInstance();
      expect(binding.isSingle()).toBe(true);

      binding.setAsTransientInstance();
      expect(binding.isTransient()).toBe(true);
    });
  });
});


/**
 * Mock
 */
class Test {
  constructor() {
    this.test = 'tested';
  }
}

class DependencyTest {
  constructor(dependencyOne, dependencyTwo) {
    this.dependencyOne = dependencyOne;
    this.dependencyTwo = dependencyTwo;
  }
}
