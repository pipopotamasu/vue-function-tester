import Vue, { VueConstructor, ComponentOptions } from 'vue';
import Target from './target';

interface TargetConstuctor extends VueConstructor {
  options: ComponentOptions<Vue>
}

interface MockMethods {
  [key: string]: Function
}

function createMockFunction(method: Function) {
  return function<args = any, returnValue = any>(args: args) {
    return new Target<args, returnValue>(method as (args: args) => returnValue, args);
  }
}

export default function methods(component: VueConstructor) {
  const methods = (component as TargetConstuctor).options.methods;
  if (!methods) throw new Error('Not exists method.');

  const mockMethods: MockMethods = {};
  Object.keys(methods).forEach(key => {
    mockMethods[key] = createMockFunction(methods[key]);
  });

  return mockMethods;
}