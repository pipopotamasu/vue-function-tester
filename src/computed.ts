import Result from './result';
import { createBaseContext } from './uitls/context';

interface MockFunction {
  (...args: any): any;
  run: Function;
  r: Function;
}

interface MockObject {
  get?: Function;
  set?: Function;
}

interface MockComputed {
  [key: string]: any;
}

function createMockFunction(targetFn: Function) {
  const createRunner = (args: any[] | null = null) => (
    injectContext: Record<string, any>
  ) => {
    const context = Object.assign({}, createBaseContext(), injectContext);
    const returnVal = targetFn.apply(context, args ? args : []);

    return new Result(returnVal, context);
  };
  const mockFunc: MockFunction = (...args: any[]) => {
    return {
      run: createRunner(args),
      r: createRunner(args)
    };
  };
  mockFunc.run = mockFunc.r = createRunner();
  return mockFunc;
}

function createMock(computed: MockComputed, computedName: string) {
  const target = computed[computedName];
  if (typeof target === 'function') {
    return createMockFunction(target);
  } else if (typeof target === 'object') {
    const mockObject: MockObject = {};
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
  if (typeof component !== 'object' && typeof component !== 'function') {
    throw new Error('Illegal component. component must be object or function.');
  }
  const computed = component.options
    ? component.options.computed // VueConstructor
    : component?.computed; // Not VueConstructor

  if (!computed) throw new Error('Not exists method.');

  const mockComputed: MockComputed = {};
  Object.keys(computed).forEach((key) => {
    mockComputed[key] = createMock({ ...computed }, key);
  });

  return mockComputed;
}
