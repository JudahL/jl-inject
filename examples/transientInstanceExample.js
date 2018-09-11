const container = require('../index').createContainer();

class Example {
  constructor(exampleDependencyInstance) {
    this.exampleDependency = exampleDependencyInstance;
  }

  increment() {
    this.exampleDependency.add(1);
  }

  print() {
    console.log(this.exampleDependency.getNum());
  }
}

class Example2 extends Example {
  increment() {
    this.exampleDependency.add(3);
  }
}

class ExampleDependency {
  constructor() {
    this.num = 0;
  }

  add(value) {
    this.num += value;
  }

  getNum() {
    return this.num;
  }
}

container.bind('example').to(Example, ['dependency']).asSingleInstance();
container.bind('example2').to(Example2, ['dependency']).asSingleInstance();

// Setting the binding resolve type to transient instance
// A new instance will be created and injected for each and every dependant that requires it
container.bind('dependency').to(ExampleDependency).asTransientInstance();

const example1 = container.resolveBinding('example');
const example2 = container.resolveBinding('example2');

example1.increment();
example2.increment();

example1.print(); // = 1
example2.print(); // = 3

// Each instance will print a different amount as they each have a reference to their own instance of ExampleDependency