import Result from './result';
import { createBaseContext } from './uitls/context';

interface MockFunction {
  (...args: any): any,
  run: Function,
  r: Function
}
interface MockMethods {
  [key: string]: MockFunction | ReturnType<typeof jest.fn>;
}

function createMockFunction(methods: { [key: string]: Function }, methodName: string) {
  const mockMethods = { ...methods } as MockMethods;
  const createRunner = (args: any[] | null = null) => (injectContext: Record<string, any>) => {
    Object.keys(methods).forEach((k) => {
      if (methodName !== k) mockMethods[k] = jest.fn();
    });
    const context = Object.assign(
      {},
      createBaseContext(),
      mockMethods,
      injectContext
    );
    const returnVal = methods[methodName].apply(context, args ? args: arguments);

    return new Result(returnVal, context);
  }

  const mockFn: MockFunction = (...args: any[]) => {
    return {
      run: createRunner(args),
      r: createRunner(args)
    };
  }
  mockFn.run = mockFn.r = createRunner();
  return mockFn;
}

export default function methods(component: any) {
  if (typeof component !== 'object' && typeof component !== 'function') {
    throw new Error('Illegal component. component must be object or function.');
  }
  const methods = component.options
    ? component.options.methods // VueConstructor
    : component?.methods; // Not VueConstructor

  if (!methods) throw new Error('Not exists method.');

  const mockMethods: { [key: string]: MockFunction } = {};
  Object.keys(methods).forEach((key) => {
    mockMethods[key] = createMockFunction({ ...methods }, key);
  });

  return mockMethods;
}
