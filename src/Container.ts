import { Type, IParam, IMetadata } from './interfaces';

class Container {

  static injectables: Map<Type | string, IMetadata> = new Map();

  static register(target: Type | string, data?: any): IMetadata {
    let value: IMetadata | undefined;

    if (Container.injectables.has(target)) {
      value = Container.injectables.get(target) || { target, args: [], props: {} };
    } else {
      if (typeof target === 'string') {
        value = { target, args: [], props: {}, data };
      } else {
        value = { target, args: [], props: {} };
      }

      Container.injectables.set(target, value);
    }

    return value;
  }

  static registerParam(target: Type, cls: Type | string, method: string | undefined, idx: number | undefined): void {
    const isArg: boolean = (typeof method === 'undefined' && typeof idx === 'number');

    let value: IMetadata;

    if (isArg) {
      value = Container.register(target);
    } else {
      value = Container.register((<any>target).constructor);
    }

    if (!value) {
      throw new Error('Class "' + target.name + '" is not registered');
    }

    if (isArg) {
      value.args.push({ idx: (idx || 0), target: cls });
    } else {
      value.props[method || ''] = cls;
    }
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

      Object.keys(value.props).forEach((key: string) => {
        singleton[key] = Container.get(value.props[key]);
      });

      value.singleton = singleton;

      return singleton;
    }
  }

}

export {
  Container
};
