const container = require('../index').createContainer();

class Example {
  constructor(exampleDependencyInstance) {
    this.exampleDependency = exampleDependencyInstance;
  }

  test() {
    this.exampleDependency.test();
  }
}

class ExampleDependency {
  test() {
    console.log('dependency injected');
  }
}

container.bind('example').to(Example, ['dependency']).asSingleInstance();
container.bind('dependency').to(ExampleDependency).asSingleInstance();

container.resolveBinding('example').test();