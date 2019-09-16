import Vue, { VueConstructor, ComponentOptions } from 'vue';

interface TargetConstuctor extends VueConstructor {
  options: ComponentOptions<Vue>
}

interface MockMethods {
  [key: string]: Function
}

function createMockFunction (): Function {
  return function (args: any) {
    return {
      run: () => console.log('run!', args)
    }
  }
}

export default function methods(component: TargetConstuctor) {
  const methods = component.options.methods;
  if (!methods) throw new Error('Not exists method.');

  const mockMethods: MockMethods = {};
  Object.keys(methods).forEach(key => {
    mockMethods[key] = createMockFunction();
  });

  return mockMethods;
}