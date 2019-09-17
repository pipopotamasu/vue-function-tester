type BaseContext = {
  [key: string]: any
}

class Target<args, returnValue> {
  f: (args: args) => returnValue;
  args: args;
  constructor(f: (args: args) => returnValue, args: args) {
    this.f = f;
    this.args = args;
  }

  run<context extends BaseContext = BaseContext>(context: context) {
    const returnVal:returnValue = this.f.call(context, this.args);
    const result: BaseContext = {
      return: returnVal
    }
    Object.keys(context).forEach(key => {
      result[key] = context[key]
    });
    return result;
  }
}

export default Target;