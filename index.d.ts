import { Type, IMetadata } from './src/interfaces';

export class Container {
  static register(target: Type | string, data?: any): IMetadata;
  static registerParam(target: Type, cls: Type | string, idx: number): void;
  static factory(target: Type, fn: Function): void;
  static get<T>(target: Type | string): T | any;
}

export function Injectable(target: Type): Type;
export function Inject(cls: Type | string): Function;
