import Result from './result';

type BaseContext = {
  [key: string]: any
}

interface MockMethods {
  [key: string]: Function
}

const baseContext: BaseContext = {
  $emit: jest.fn()
}

function createMockFunction(methods: MockMethods, methodName: string) {
  return function(...args: any) {
    return {
      run: (injectContext: Object) => {
        Object.keys(methods).forEach(k => {
          if (methodName !== k) methods[k] = jest.fn();
        });
        const context = Object.assign({}, baseContext, methods, injectContext);
        const returnVal = methods[methodName].apply(context, args);

        return new Result(returnVal, context);
      }
    }
  }
}

export default function methods(component: any) {
  const methods = component.options ?
    component.options.methods : // VueConstructor
    component.methods; // Not VueConstructor

  if (!methods) throw new Error('Not exists method.');

  const mockMethods: MockMethods = {};
  Object.keys(methods).forEach(key => {
    mockMethods[key] = createMockFunction({ ...methods }, key);
  });

  return mockMethods;
}