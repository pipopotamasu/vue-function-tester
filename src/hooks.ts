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

interface MockFunction {
  (...args: any): any;
  run: Function;
  r: Function;
}
interface MockFunctions {
  [key: string]: MockFunction | ReturnType<typeof jest.fn>;
}

function createMockFunction(
  funcs: { [key: string]: Function },
  funcName: string
) {
  const mockFuncs = { ...funcs } as MockFunctions;

  const createRunner = (args: any[] | null = null) => (
    injectContext: Record<string, any>
  ) => {
    Object.keys(funcs).forEach((k) => {
      if (funcName !== k) mockFuncs[k] = jest.fn();
    });
    const context = Object.assign(
      {},
      createBaseContext(),
      mockFuncs,
      injectContext
    );
    const returnVal = funcs[funcName].apply(context, args ? args : []);

    return new Result(returnVal, context);
  };

  const targetMockFunc: MockFunction = (...args: any[]) => {
    return {
      run: createRunner(args),
      r: createRunner(args)
    };
  };
  targetMockFunc.run = targetMockFunc.r = createRunner();
  return targetMockFunc;
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

  const mockHookes: { [key: string]: MockFunction } = {};
  Object.keys(hooks).forEach((key) => {
    mockHookes[key] = createMockFunction({ ...hooks, ...methods }, key);
  });

  return mockHookes;
}
