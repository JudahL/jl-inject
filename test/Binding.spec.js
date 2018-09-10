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
    expect(typeof binding.resolution).toBe('function');
  });

  it('can accept dependency keys as a constructor argument', () => {
    const binding = new Binding(Test, ['test2', 'test3', 'test4']);
    expect(binding.dependencies.length).toBe(3);
    expect(typeof binding.dependencies[0]).toBe('string');
  });

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
    const dep1 = 'dep1';
    const dep2 = 'dep2';
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
