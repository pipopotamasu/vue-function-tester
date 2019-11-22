# vue-function-tester
vue-function-tester makes method unit testing for Vue components easier and shorter by providing mock functions and helper objects.

## Features
Providing mock functions and helper objects for unit testing and they help to reduce steps and codes.

Supporting...
- methods
- lifecycle hooks
- computed
- watch

vue-function-helper dependents on [Jest](https://jestjs.io).

## Installation
```
$ npm install -D vue-function-tester

or

$ yarn add -D vue-function-tester
```

## Usage
### methods
See [spec](https://github.com/pipopotamasu/vue-function-tester/blob/master/spec/methods.spec.ts) if you want more detailed examples.

```js
// SampleComponent.vue
export default {
  data() {
    return {
      liked: false
    };
  },
  methods: {
    sayHi() {
      return 'Hi!';
    },
    sayHiWithName(firstname: string, lastname: string) {
      return `Hi, ${firstname} ${lastname}`!;
    },
    like() {
      this.liked = true;
    },
    callOtherMethod() {
      return this.otherMethod();
    },
    otherMethod() {
      // called by other methods
    },
    emitEvent () {
      this.$emit('some-event', 'value')
    }
  }
}

// yourMethodsTest.spec.js
import SampleComponent from './SampleComponent.vue';
import { methods } from 'vue-function-tester';

describe('Methods', () => {
  // extracts mock methods from your component.
  const { sayHi, sayHiWithName, like, callOtherMethod } = methods(SampleComponent);

  it('returns value', () => {
    const result = sayHi().run();
    expect(result.return).toBe('Hi!');
  });

  it('returns value with args', () => {
    const result = sayHiWithName('Tom', 'Smith').run();
    expect(result.return).toBe('Hi, Tom Smith!');
  });

  it('chaneges context value', () => {
    // like method changes data property `liked` to true
    const result = like().run({ liked: false });
    expect(result.liked).toBe(true);
  });

  it('calls other methods', () => {
    // automatically setup jest.fn() inside target function.
    const result = callOtherMethod().run();
    expect(result.otherMethod).toBeCalled();
  });

  it('overrides default jest.fn()', () => {
    const result = callOtherMethod().run({
      otherMethod: jest.fn(() => 'override')
    });
    expect(result.return).toBe('override');
  });

  it('emits event', () => {
    const result = emitEvent().run();
    expect(result.$emit).toBeCalledWith('some-event', 'value');
  });
});

```
### lifecycle hooks
See [spec](https://github.com/pipopotamasu/vue-function-tester/blob/master/spec/hooks.spec.ts) if you want more detailed examples.

```js
// SampleComponent.vue
export default {
  data() {
    return {
      updatedCount: 0,
    };
  },
  created() {
    this.otherMethod();
  },
  updated() {
    this.updatedCount++;
  },
  beforeRouteEnter(_to: string, _from: string, next: Function) {
    next();
  }
});

// yourHooksTest.spec.js
import SampleComponent from './SampleComponent.vue';
import { hooks } from 'vue-function-tester';

describe('Lifecycle Hooks', () => {
  const { created, updated, beforeRouteEnter } = hooks(SampleComponent);

  it('calls other method', () => {
    expect(created().run().otherMethod).toBeCalled();
  });

  it('registers additional hooks', () => {
    const { beforeRouteEnter } = hooks(
      SampleComponent,
      ['beforeRouteEnter'] // be able to regist additional hooks like vue-router
    );
    const next = jest.fn();
    beforeRouteEnter('', '', next).run()
    expect(next).toBeCalled();
  });
});
```

### computed
See [spec](https://github.com/pipopotamasu/vue-function-tester/blob/master/spec/computed.spec.ts) if you want more detailed examples.

```js
// SampleComponent.vue
export default {
  computed: {
    sayHello() {
      return 'Hello!';
    },
    displayName: {
      get() {
        return `Mr. ${this.name}`;
      },
      set(newName) {
        this.$emit('change-name', newName);
      }
    }
  },
});

// yourComputedTest.spec.js
import SampleComponent from './SampleComponent.vue';
import { computed } from 'vue-function-tester';

describe('Computed', () => {
  const { sayHello, displayName } = computed(SampleComponent);

  it('returns value', () => {
    expect(sayHello().run().return).toBe('Hello!');
    expect(displayName.get().run().return).toContain('Mr');
  });

  describe('getter/setter', () => {
    it('applys context value to getter', () => {
      const result = displayName.get().run({ name: 'Tom' });
      expect(result.return).toBe('Mr. Tom');
    });

    it('emits event by setter', () => {
      const result = displayName.set('Tom').run();
      expect(result.$emit).toBeCalledWith('change-name', 'Tom');
    });
  })
});
```

### watch
See [spec](https://github.com/pipopotamasu/vue-function-tester/blob/master/spec/watch.spec.ts) if you want more detailed examples.

```js
// SampleComponent.vue
export default {
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      output: ''
    }
  },
  watch: {
    count (newVal) {
      if (newVal % 15 === 0) {
        this.output = 'Fizz Buzz'
      } else {
        this.otherMethod();
      }
    }
  },
  methods: {
    otherMethod () { ... }
  }
});

// yourWatchTest.spec.js
import SampleComponent from './SampleComponent.vue';
import { watch } from 'vue-function-tester';

describe('Watch', () => {
  const { count } = watch(SampleComponent);

  describe('mock methods', () => {
    it('calls other method', () => {
      expect(count(1).run().otherMethod).toBeCalled();
    });
  });

  describe('context', () => {
    it('chaneges output', () => {
      const result = count(15).run({ output: '' });
      expect(result.output).toBe('Fizz Buzz');
    });
  });
});
```

### alias
vue-function-test provides some alias.

```js

// normal usage
expect(sayHi().run().return).toBe('Hi!');

// shorten run
expect(sayHi().r().return).toBe('Hi!');

// function properties
expect(sayHi.run().return).toBe('Hi!');
expect(sayHi.r().return).toBe('Hi!');
```

## License
MIT
