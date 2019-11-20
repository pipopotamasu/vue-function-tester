import Result from './result';
import { createBaseContext } from './uitls/context';

const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
];

interface MockHooks {
  [key: string]: Function;
}

function createMockFunction(hooks: MockHooks, methodName: string) {
  return function(...args: any) {
    const run = (injectContext: Record<string, any>) => {
      Object.keys(hooks).forEach((k) => {
        if (methodName !== k) hooks[k] = jest.fn();
      });

      const context = Object.assign(
        {},
        createBaseContext(),
        hooks,
        injectContext
      );
      const returnVal = hooks[methodName].apply(context, args);

      return new Result(returnVal, context);
    };
    return {
      run,
      r: run
    };
  };
}

export default function hooks(component: any, additionalHooks: string[] = []) {
  if (typeof component !== 'object' && typeof component !== 'function') {
    throw new Error('Illegal component. component must be object or function.');
  }
  const targetHooks = LIFECYCLE_HOOKS.concat(additionalHooks);
  const hooks = component.options
    ? // VueConstructor
      Object.keys(component.options).reduce((hooks, key) => {
        if (targetHooks.includes(key)) {
          return {
            ...hooks,
            [key]:
              typeof component.options[key] === 'object'
                ? component.options[key][0]
                : component.options[key]
          };
        }
        return hooks;
      }, {})
    : // Not VueConstructor
      Object.keys(component).reduce((hooks, key) => {
        if (targetHooks.includes(key))
          return { ...hooks, [key]: component[key] };
        return hooks;
      }, {});

  if (Object.keys(hooks).length === 0) throw new Error('Not exists hook.');

  const methods = component.options
    ? component.options.methods // VueConstructor
    : component?.methods; // Not VueConstructor

  const mockHookes: MockHooks = {};
  Object.keys(hooks).forEach((key) => {
    mockHookes[key] = createMockFunction({ ...hooks, ...methods }, key);
  });

  return mockHookes;
}
