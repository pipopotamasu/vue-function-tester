class Target<args, returnValue> {
  f: Function;
  args: args;
  constructor(f: Function, args: args) {
    this.f = f;
    this.args = args;
  }

  run<context extends { [key: string]: any }>(context: context) {
    const returnVal:returnValue = this.f.call(context, this.args);
    const result = {
      return: returnVal
    } as { [key: string]: any }
    Object.keys(context).forEach(key => {
      result[key] = context[key]
    });
    return result;
  }
}

export default Target;