import Vue, { VueConstructor, ComponentOptions } from 'vue';
import Result from './result';

interface TargetConstuctor extends VueConstructor {
  options: ComponentOptions<Vue>
}

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

export default function methods(component: VueConstructor) {
  const methods = (component as TargetConstuctor).options.methods;
  if (!methods) throw new Error('Not exists method.');

  const mockMethods: MockMethods = {};
  Object.keys(methods).forEach(key => {
    mockMethods[key] = createMockFunction({ ...methods }, key);
  });

  return mockMethods;
}