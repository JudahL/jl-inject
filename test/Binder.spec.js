const Binder = require('../src/Binder');

describe('Binder', () => {
  it('is exported as a module', () => {
    expect(Binder).toBeDefined();
  });

  it('can accept a Container and type as constructor arguments', () => {
    const testArg = 'testArg', testType = 'testType';

    const container = new ContainerTest(testArg);
    const binder = new Binder(BindingTest, container, testType);

    expect(binder.container.test).toBe(testArg);
    expect(binder.type).toBe(testType)
  });

  it('can create a new binding using a resolution WITHOUT dependencies and add it to the container', () => {
    const testType = 'testType', testRes = 'testResolution';

    const container = new ContainerTest();
    const binder = new Binder(BindingTest, container, testType);

    binder.to(testRes);
    expect(container.type).toBe(testType);
    expect(container.binding).toBeDefined();
  });

  it('can create a new binding using a resolution WITH dependencies and add it to the container', () => {
    const testType = 'testType', testRes = 'testResolution', testDeps = ['testDep1', 'testDep2'];

    const container = new ContainerTest();
    const binder = new Binder(BindingTest, container, testType);

    binder.to(testRes, testDeps);
    expect(container.type).toBe(testType);
    expect(container.binding).toBeDefined();
  });
});

class ContainerTest {
  constructor(testArg) {
    this.test = testArg;
  }

  addBinding(type, binding) {
    this.type = type;
    this.binding = binding;
  }
}

class BindingTest {
  constructor(resolution, dependencies) {

  }

  setAsSingleInstance() {

  }

  setAsTransientInstance() {

  }
}