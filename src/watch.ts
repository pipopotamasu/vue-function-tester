import Result from './result';
import { createBaseContext } from './uitls/context';

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

export default function watch(component: any) {
  if (typeof component !== 'object' && typeof component !== 'function') {
    throw new Error('Illegal component. component must be object or function.');
  }
  const watchers = component.options
    ? component.options.watch // VueConstructor
    : component?.watch; // Not VueConstructor

  if (!watchers) throw new Error('Not exists watcher.');

  let methods = component.options
    ? component.options.methods // VueConstructor
    : component?.methods; // Not VueConstructor

  if (!methods) methods = {};

  const mockWatchers: { [key: string]: MockFunction } = {};
  Object.keys(watchers).forEach((key) => {
    mockWatchers[key] = createMockFunction({ ...watchers, ...methods }, key);
  });

  return mockWatchers;
}
