import { Type, IParam, IMetadata } from './interfaces';

class Container {

  static injectables: Map<Type | string, IMetadata> = new Map();

  static register(target: Type | string, data?: any): IMetadata {
    let value: IMetadata | undefined;

    if (Container.injectables.has(target)) {
      value = Container.injectables.get(target) || { target, args: [] };
    } else {
      if (typeof target === 'string') {
        value = { target, args: [], data };
      } else {
        value = { target, args: [] };
      }

      Container.injectables.set(target, value);
    }

    return value;
  }

  static registerParam(target: Type, cls: Type | string, idx: number): void {
    const value: IMetadata = Container.register(target);

    if (!value) {
      throw new Error('Class "' + target.name + '" is not registered');
    }

    value.args.push({ idx, target: cls });
  }

  static factory(target: Type, fn: Function): void {
    const value: IMetadata = Container.register(target);

    value.factory = fn;
  }
  
  static get<T>(target: Type | string): T | any {
    const value: IMetadata | undefined = Container.injectables.get(target);

    if (!value) {
      if (typeof target === 'string') {
        throw new Error('Class "' + target + '" is not registered');
      } else {
        throw new Error('Class "' + target.name + '" is not registered');
      }
    }

    if (typeof value.target === 'string') {
      return value.data;
    } else if (value.factory) {
      let args: IParam[] = [ ...value.args ];
      
      args.sort((a: IParam, b: IParam) => (a.idx < b.idx ? -1 : 1));
      args = args.map((v: IParam) => Container.get(v.target));

      return value.factory(...args);
    } else if (value.singleton) {
      return value.singleton as any;
    } else {
      const cls: Type | string = value.target;
      
      let args: IParam[] = [ ...value.args ];
      
      args.sort((a: IParam, b: IParam) => (a.idx < b.idx ? -1 : 1));
      args = args.map((v: IParam) => Container.get(v.target));
      
      const singleton: any = new cls(...args);

      value.singleton = singleton;

      return singleton;
    }
  }

}

export {
  Container
};
