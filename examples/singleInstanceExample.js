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

// Setting the binding resolve type to single instance
// Only one instance will be created and injected into any dependants
container.bind('dependency').to(ExampleDependency).asSingleInstance();

const example1 = container.resolveBinding('example');
const example2 = container.resolveBinding('example2');

example1.increment();
example2.increment();

example1.print(); // = 4
example2.print(); // = 4

// Both instances will print 4 as they share the same reference to the single instance of ExampleDependency