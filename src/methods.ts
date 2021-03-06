import Result from './result';
import { createBaseContext } from './uitls/context';

function createMockFunction(
  methods: { [key: string]: Function },
  methodName: string
) {
  const mockMethods = { ...methods } as MockFunctions;
  const createRunner = (args: any[] | null = null) => {
    Object.keys(methods).forEach((k) => {
      if (methodName !== k) mockMethods[k] = jest.fn();
    });

    const targetMethod = methods[methodName];
    if (targetMethod.constructor.name === 'AsyncFunction') {
      return async (injectContext: Record<string, any>) => {
        const context = Object.assign(
          {},
          createBaseContext(),
          mockMethods,
          injectContext
        );

        const returnVal = await targetMethod.apply(context, args ? args : []);
        return new Result(returnVal, context);
      };
    }

    return (injectContext: Record<string, any>) => {
      const context = Object.assign(
        {},
        createBaseContext(),
        mockMethods,
        injectContext
      );

      const returnVal = targetMethod.apply(context, args ? args : []);
      return new Result(returnVal, context);
    };
  };

  const mockFn: MockFunction = (...args: any[]) => {
    return {
      run: createRunner(args),
      r: createRunner(args)
    };
  };
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
