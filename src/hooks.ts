import Result from './result';

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

type BaseContext = {
  [key: string]: any;
};

interface MockHooks {
  [key: string]: Function;
}

const baseContext: BaseContext = {
  $emit: jest.fn()
};

function createMockFunction(hooks: MockHooks, methodName: string) {
  return function(...args: any) {
    return {
      run: (injectContext: Record<string, any>) => {
        Object.keys(hooks).forEach((k) => {
          if (methodName !== k) hooks[k] = jest.fn();
        });

        const context = Object.assign({}, baseContext, hooks, injectContext);
        const returnVal = hooks[methodName].apply(context, args);

        return new Result(returnVal, context);
      }
    };
  };
}

export default function hooks(component: any, additionalHooks: string[] = []) {
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
    : component.methods; // Not VueConstructor

  const mockHookes: MockHooks = {};
  Object.keys(hooks).forEach((key) => {
    mockHookes[key] = createMockFunction({ ...hooks, ...methods }, key);
  });

  return mockHookes;
}
