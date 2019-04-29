<h1>Ontime Dependency Injection</h1>

The library is used to dependency injection.

<h3>Default usage</h3>

```javascript
import { Injectable, Inject, Container } from 'ontime-di';

@Injectable
class Test1 {

}

@Injectable
class Test2 {
  constructor(@Inject(Test) private _test1: Test1) {}

  getTest1(): Test1 {
    return this._test1;
  }
}

const t2 = Container.get<Test2>(Test2);

(t2 instanceof Test2) // -> true
(t2.getTest1() instanceof Test1) // -> true
```
