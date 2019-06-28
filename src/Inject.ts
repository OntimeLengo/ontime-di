import { Type } from './interfaces';
import { Container } from './Container';

function Inject(cls: Type | string): Function {
  return function(target: Type, method: string, idx?: number): number | undefined {
    Container.registerParam(target, cls, method, idx);

    return (typeof idx === 'number') ? idx : void(0);
  }
}

export {
  Inject
};
