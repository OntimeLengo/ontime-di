import { Container } from '../Container';
import { Injectable } from '../Injectable';
import { Inject } from '../Inject';

@Injectable
class A {

  public name: string = 'class A';

  testA() {}

}

@Injectable
class B {

  public name: string = 'class B';

  testB() {}

}

@Injectable
class C {
  
  public name: string = 'class C';
  
  @Inject(B) 
  private _b: B | undefined;

  constructor(@Inject(A) private _a: A) {}

  getA(): A | undefined {
    return this._a;
  }

  getB(): B | undefined {
    return this._b;
  }

}

describe('DI', () => {
  it('Container', () => {
    const c: C = Container.get<C>(C);

    expect(c instanceof C).toEqual(true);
  });

  it('Check property', () => {
    const c: C = Container.get<C>(C);
    const b: B | undefined = c.getB();

    expect(b instanceof B).toEqual(true);
  });

  it('Check constructor arguments', () => {
    const c: C = Container.get<C>(C);
    const a: A | undefined = c.getA();

    expect(a instanceof A).toEqual(true);
  });

});
