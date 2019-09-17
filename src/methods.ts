import Vue, { VueConstructor, ComponentOptions } from 'vue';

interface TargetConstuctor extends VueConstructor {
  options: ComponentOptions<Vue>
}

interface MockMethods {
  [key: string]: Function
}

function createMockFunction<args>(): Function {
  return function (args: args) {
    return {
      run: () => console.log('run!', args)
    }
  }
}

export default function methods<args = any>(component: TargetConstuctor) {
  const methods = component.options.methods;
  if (!methods) throw new Error('Not exists method.');

  const mockMethods: MockMethods = {};
  Object.keys(methods).forEach(key => {
    mockMethods[key] = createMockFunction<args>();
  });

  return mockMethods;
}