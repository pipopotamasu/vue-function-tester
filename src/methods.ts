import Result from './result';
import { createBaseContext } from './uitls/context';

interface MockMethods {
  [key: string]: Function;
}

function createMockFunction(methods: MockMethods, methodName: string) {
  return function(...args: any) {
    const run = (injectContext: Record<string, any>) => {
      Object.keys(methods).forEach((k) => {
        if (methodName !== k) methods[k] = jest.fn();
      });
      const context = Object.assign({}, createBaseContext(), methods, injectContext);
      const returnVal = methods[methodName].apply(context, args);

      return new Result(returnVal, context);
    };
    return {
      run,
      r: run
    };
  };
}

export default function methods(component: any) {
  const methods = component.options
    ? component.options.methods // VueConstructor
    : component.methods; // Not VueConstructor

  if (!methods) throw new Error('Not exists method.');

  const mockMethods: MockMethods = {};
  Object.keys(methods).forEach((key) => {
    mockMethods[key] = createMockFunction({ ...methods }, key);
  });

  return mockMethods;
}
