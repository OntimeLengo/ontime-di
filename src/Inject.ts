import { Type } from './interfaces';
import { Container } from './Container';

function Inject(cls: Type | string): Function {
  return function(target: Type, method: string, idx: number): number {
    Container.registerParam(target, cls, idx);

    return idx;
  }
}

export {
  Inject
};
