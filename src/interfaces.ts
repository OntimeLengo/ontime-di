interface Type {
  new (...args: any[]): any;
}

interface IParam {
  idx: number;
  target: Type | string;
}

interface IMetadata {
  target: Type | string;
  args: IParam[];
  singleton?: Type | any;
  factory?: Function;
  data?: any;
}

export {
  Type,
  IMetadata,
  IParam
};
