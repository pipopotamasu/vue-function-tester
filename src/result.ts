class Result<returnValue> {
  _returnVal: returnValue;

  constructor(returnVal: returnValue, context: { [key: string]: any }) {
    this._returnVal = returnVal;
    Object.keys(context).forEach(key => {
      // FIXME: generate getter
      (this as any)[key] = context[key];
    });
  }

  get return () {
    return this._returnVal;
  }
}

export default Result;