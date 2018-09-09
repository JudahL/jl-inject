const Container = require('../src/Container');

/**
 * Tests
 */
describe('Container', () => {
  it('is exported as a module', () => {
    expect(Container).toBeDefined();
  });

  it('can add a new binding', () => {
    const container = new Container();
    const type = 'test1';

    container.bind(type, Test);
    const test = container.hasBinding(type);
    expect(test).toBe(true);
  });

  it('can resolve a binding type', () => {
    const container = new Container();
    const type = 'test1';

    container.bind(type, Test);
    const testInstance = container.resolveBinding(type);
    expect(testInstance.test()).toEqual(testedString);
  });

  it('can resolve a binding type with dependencies', () => {
    const container = new Container();
    const testType = 'test1';
    const dependencyTestType = 'test2';

    container.bind(testType, Test);
    container.bind(dependencyTestType, DependencyTest, [testType]);
    const testInstance = container.resolveBinding(dependencyTestType);
    expect(testInstance.testDependency()).toEqual(testedString);
  });

  it('throws an error if an undefined binding is resolved', () => {
    const container = new Container();

    function attemptToResolveUndefinedBinding() {
      container.resolveBinding('test1');
    }

    expect(attemptToResolveUndefinedBinding).toThrow('binding not defined');
  });
});


/**
 * Mock
 */
const testedString = 'tested';

class Test {
  test() {
    return testedString;
  }
}

class DependencyTest extends Test {
  constructor(dependency) {
    super();
    this.dependency = dependency;
  }

  testDependency() {
    return this.dependency.test();
  }
}