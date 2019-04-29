import { Type } from './interfaces';
import { Container } from './Container';

function Injectable(target: Type): Type {
  Container.register(target);

  return target;
}

export {
  Injectable
};
