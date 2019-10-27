import Result from './result';

type BaseContext = {
  [key: string]: any;
};

interface MockComputed {
  [key: string]: any;
}

const baseContext: BaseContext = {
  $emit: jest.fn()
};

function createMockFunction (targetFn: Function) {
  return function(...args: any) {
    const run = (injectContext: Record<string, any>) => {
      const context = Object.assign({}, baseContext, computed, injectContext);
      const returnVal = targetFn.apply(context, args);

      return new Result(returnVal, context);
    };
    return {
      run,
      r: run
    };
  }
}

function createMock(computed: MockComputed, computedName: string) {
  const target = computed[computedName];
  if (typeof target === 'function') {
    return createMockFunction(target);
  } else if (typeof target === 'object') {
    const mockObject: { get?: Function, set?: Function } = {};
    if (target.get) {
      mockObject.get = createMockFunction(target.get);
    }

    if (target.set) {
      mockObject.set = createMockFunction(target.set);
    }
    return mockObject;
  } else {
    throw new Error('Unexpected computed property.');
  }
}

export default function computed(component: any) {
  const computed = component.options
    ? component.options.computed // VueConstructor
    : component.computed; // Not VueConstructor

  if (!computed) throw new Error('Not exists method.');

  const mockComputed: MockComputed = {};
  Object.keys(computed).forEach((key) => {
    mockComputed[key] = createMock({ ...computed }, key);
  });

  return mockComputed;
}
