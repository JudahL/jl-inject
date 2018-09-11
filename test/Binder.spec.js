const Binder = require('../src/Binder');

describe('Binder', () => {
  it('is exported as a module', () => {
    expect(Binder).toBeDefined();
  });

  it('can accept a Binding constructor, Container instance and binding type as constructor arguments', () => {
    const testArg = 'testArg', testType = 'testType';

    const container = new ContainerTest(testArg);
    const binder = new Binder(BindingTest, container, testType);

    expect(binder.container.test).toBe(testArg);
    expect(binder.type).toBe(testType)
  });

  describe('Binder.to', () => {
    it('can create a new binding using a resolution WITHOUT dependencies and add it to the container', () => {
      const testType = 'testType', testRes = 'testResolution';

      const container = new ContainerTest();
      const binder = new Binder(BindingTest, container, testType);

      binder.to(testRes);
      expect(container.type).toBe(testType);
      expect(container.binding instanceof BindingTest).toBe(true);
    });

    it('can create a new binding using a resolution WITH dependencies and add it to the container', () => {
      const testType = 'testType', testRes = 'testResolution', testDeps = ['testDep1', 'testDep2'];

      const container = new ContainerTest();
      const binder = new Binder(BindingTest, container, testType);

      binder.to(testRes, testDeps);
      expect(container.type).toBe(testType);
      expect(container.binding instanceof BindingTest).toBe(true);
      expect(container.binding.dependencies).toEqual(testDeps);
    });

    it('returns an instance resolve type setter object', () => {
      const testType = 'testType', testRes = 'testResolution';

      const container = new ContainerTest();
      const binder = new Binder(BindingTest, container, testType);

      const setter = binder.to(testRes);
      expect(setter.asSingleInstance).toBeDefined();
      expect(setter.asTransientInstance).toBeDefined();
    });

    it('can use the returned setter object to set the binding resolve type to SINGLE instance', () => {
      const testType = 'testType', testRes = 'testResolution';

      const container = new ContainerTest();
      const binder = new Binder(BindingTest, container, testType);

      binder.to(testRes).asSingleInstance();
      expect(container.binding.type).toBe('singleInstance');
    });

    it('can use the returned setter object to set the binding resolve type to TRANSIENT instance', () => {
      const testType = 'testType', testRes = 'testResolution';

      const container = new ContainerTest();
      const binder = new Binder(BindingTest, container, testType);

      binder.to(testRes).asTransientInstance();
      expect(container.binding.type).toBe('transientInstance');
    });
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
    this.dependencies = dependencies;
  }

  setAsSingleInstance() {
    this.type = 'singleInstance';
  }

  setAsTransientInstance() {
    this.type = 'transientInstance';
  }
}