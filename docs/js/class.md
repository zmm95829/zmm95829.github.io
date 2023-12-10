# 类的基本使用

## 传统生成实例对象与 class

```js
// 构造函数
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
const p = new Point(1, 2);
```

es6 新增 class 语法糖

## class 快速理解

- 是特殊的函数，这个类的命名或者变量名使用大写开头

- 函数声明会提升，类声明不会提升，必须先声明类才能使用

- 类必须使用 new 调用，否则会报错；普通构造函数可以不需要 new

- class MyClassName {} 中

  - 类的所有方法都定义在类的 prototype 属性上面： a = new MyClassName(); a.constructor === MyClassName.constructor 
  - 实例的属性除非显式定义在其本身（即 this 上，一般 constructor 中去定义实例的属性），否则都是定义在原型上（即定义在class上）
  - 实例的方法需要 实例.方法名() 调用，不能将方法赋值给变量后调用，因为内部的 this 是 undefined （严格模式）【可以通过在构造方法中绑定 this 或定义方法时使用箭头函数方式解决】

- 类的内部所有定义的方法，都是不可枚举的【显性定义的方法】

  - Object.keys(MyClassName .prototype) 获取不到，Object.getOwnPropertyNames(MyClassName.prototype) 可以获取到
  - 但是 es5 方式的写法，是可枚举的

- 类结构与使用
  ```js
  class MyClassName {
      c = 0;
      // 构造函数
      constructor(a, b) {
          console.log(new.target === MyClassName)
          this.a = a;
          this.b = b;
      }
      // 静态属性
      static myKey = "key1";
      // 静态方法
      static myMethod(x, y){
          return x + y;
      }
      // 普通方法
      myMthod() {}
  
  }
  ```

  - constructor 构造方法
    - 通过 new 命令生成对象实例时，自动调用该方法，一个类必须有，没有显性定义时，会默认添加一个空的
    - 默认返回实例对象（即 this ），如果显性返回全新对象，会导致 new 出来的不是类的实例
    - 类的数据类型就是函数：typeof MyClassName  ===  "function" 
    - 类本身就指向构造函数：MyClassName  === MyClassName.prototype.constructor
    - 可以在构造函数中使用 this 去定义实例属性，也可以与 constructor 同级上面（类的顶部）定义实例属性
    - new.target：如果调用 constructor 构造方法时不是使用 new 命令或 Reflect.construct() 命令，则会返回 undefined
      - 子类继承父类时，new.target 会返回子类
  - this：实例对象
  - static：定义静态方法、静态属性的关键字
    - es6 明确规定，Class 内部只有静态方法，没有静态属性；后面又出提案可以有
      - 可以在外部 MyClassName.myKey = 1 这样方式定义静态属性
    - 静态属性或者方法不会被实例继承，只能通过类来调用
    - 静态方法中的 this 指向的是类而不是实例
    - 静态方法可以与非静态方法重名
    - 父类的静态方法，可以被子类自动继承；在子类中，也可以通过 super.静态方法名() 方式调用

## 定义类

两种方式：类声明、类表达式
1. 类声明

```js
class People {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

console.log(People.name) // People，name 与类名一致

```
2. 类表达式

```js
// 匿名
const People1 = class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
console.log(People1.name) // People1，name 与变量名一致

// 命名
const People2 = class People3 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
console.log(People2.name) // People3，name 与类名一致
console.log(People3) // 报错，People3 is not defined; 这个 People3 只能在 class 内部有定义，可以被使用


```

## 给类添加新方法

给原型上添加

```js
class People {
  constructor(){}
}
People.prototype.m1 = function(){}
// 使用 Object.assign
Object.assign(People.prototype, {
  m2(){},
  m3(){}
});
```

# 类的继承

```js
class PClass {
  constructor(x, y) {
	  this.x = x;
      this.y = y;
  }
}
class SubClass extends PClass {
  constructor(x, y, d) {
    super(x, y); // 调用父类的constructor(x, y)
    this.d = d;
  }
  myMethods() {
      return this.d + super.myMethods();
  }
}
```

- extends：继承关键字
  - 可以继承父类的所有属性和方法
  - es5 的继承：先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面
  - ES6 的继承：先将父类实例对象的属性和方法，加到 this 上面（必须先调用 super 方法），然后再用子类的构造函数修改 this
- constructor：子类的构造函数
  - 必须调用 super() 从父类继承，否则得不到 this 对象
  - 调用 super 之后，才可以使用 this 关键字，否则会报错
  - 如果子类没有显性定义 constructor，则默认添加一个调用了 super() 的
- super：父类的构造函数、父类原型对象
  - 可以当作函数使用：代表父类的构造函数
    - 在子类构造函数中，必须执行一次 super 函数【相当于PClass.prototype.constructor.call(this)】
    - 只能在子类构造函数中使用 super()
  - 也可以当作对象使用：在普通方法中，super 指向父类的**原型对象**，静态方法中，指向父类
    - 定义在父类实例（this）上的方法或属性，是无法通过super调用的。也就是不能 super.x 这样
    - 在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类实例
    - 在子类的静态方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例
  - super.d = xxx 时被当做 this：
    - 在子类构造函数中，如果使用了  super.d = xxx 相当于 this.d = xxx
    - 单纯打印获取 super.d 时是 undefined
  - 使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错（console.log(super) 这样含糊的使用会报错，可以 console.log(super.valueOf() instanceof PClass)）
  - const obj = {}，对象总是继承其他对象，所以可以在任意对象中，使用 super 关键字