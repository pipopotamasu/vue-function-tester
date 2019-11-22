declare interface MockFunction {
  (...args: any): any;
  run: Function;
  r: Function;
}

declare interface MockFunctions {
  [key: string]: MockFunction | ReturnType<typeof jest.fn>;
}