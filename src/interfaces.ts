interface Type {
  new (...args: any[]): any;
}

interface IParam {
  idx: number;
  target: Type | string;
}

interface IProps {
  [key: string]: Type | any;
}

interface IMetadata {
  target: Type | string;
  args: IParam[];
  props: IProps;
  singleton?: Type | any;
  factory?: Function;
  data?: any;
}

export {
  Type,
  IMetadata,
  IParam
};
