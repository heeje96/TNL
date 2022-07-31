# 객체지향 프로그래밍

OOP : Object-Oriented Programming

- 객체란? 여러 개의 독립된 단위
- 프로그램을 여러 **객체간의 상호작용**으로 파악하는 프로그래밍 방식
- 데이터와 기능(메서드)을 분리해서, 절차 지향 프로그래밍 방식에서 벗어나고자 하였다.
- **추상화**를 통해서 복잡한 코드를 숨기고, 필요한 것만 취할 수 있다.
- 면접에 많이 나온다..



### 장점

- 클래스 단위로 모듈화시켜, 많은 인원이 참여하는 대규모 개발에 적합
- 유지 보수가 쉬움

### 단점

- 설계 시 많은 노력과 시간이 필요함

- 실행속도가 상대적으로 느림

  



### 객체란?

- 속성(변수 Attribute)과 행동(함수 - 메서드 Method)으로 구성되어있다.

### 클래스와 객체

- 클래스는 설계도, 데이터가 들어가면 객체
- **인스턴스**와 **객체**의 차이점
  - `객체 = 정보 + 행동`이면 다~ 객체다.
  - `특정 클래스(타입)의 인스턴스` 라고 지칭한다.
  - 그래서 객체(object)는 특정 타입(class)의 인스턴스(instance)이다



## 파이썬은 모든 것이 객체(Object)이다.

파이썬의 모든 것엔 속성과 행동이 존재한다.

ex) [3, 2, 1].sort()   // 객체.행동()  // [3,2,1] -> 문자열 타입의 인스턴스 // sort() -> 메서드



### 기본 문법

```python
class Person: ### 첫 글자 대문자~
    pass

print(type(Person)) # <class 'type'>

person1 = Person()

print(isinstance(person1, Person)) # True
print(type(person1)) # <class '__main__.Person'>
```



### 객체 비교

- `==` 다른 대상이더라도, 데이터만 같아도 : True
  - 상대적으로 가벼움
- `is` 두 변수가 동일한 객체를 가리키는 경우(주소가 같으면) : True
  - 엄격함



### 속성(데이터, 정보, 상태)  --> 변수

```python
class Person:
    blood_color ='red' #클래스변수 -- 모두가 같은 것은 클래스 변수
    
    def __init__(self,name):
        self.name = name #인스턴스 변수  -- 각자 다른 것은 인스턴스 변수
                         #첫번째 파라미터는 무조건 self
person1 = Person('지민')
print(person1.name) #print 지민
```

- `self`는 첫 번째 파라미터에 정의되어야 한다.
- 처음 정의 될 땐 생략 된다.



### 인스턴스 변수란?

- 인스턴스가 개인적으로 가지고 있는 속성(attribute)
- 각 인스턴스들의 고유한 변수
- 생성자 메서드(`__init__`)에서 `self.<name>`으로 정의
- 인스턴스가 생성 된 이후 `<instance>.<name>`으로 접근 및 할당



### 클래스 변수란?

- 공용이다! 바꾸면 다 같이 바뀐다.



### 인스턴스 클래스 변수 주의

- `인스턴스.변수`가 없으면, 클래스 변수가 반환된다. <--권장하지 않는다.
- 클래스 변수이름과 인스턴스 변수이름이 같으면 인스턴스.변수가 생성된다. 
  그리고 앞으로 이 인스턴스 내에서 클래스 변수보다 우선 순위가 된다.



### 메서드

- 정의 : 클래스 안에 있는 함수

- 종류 : 
  - 인스턴스 메서드 : 인스턴스 변수를 처리(개인 행동)
    - 첫번째 인자로 `self`(인스턴스 자기자신)를 전달함
  - 클래스 메서드 : 클래스 변수를 처리(단체 행동)
  - 정적 메서드(static) : 나머지
    - @staticmethod 데코레이터로 정의
    - cls, class 전부 사용하지 않는 메서드



### 생성자 메서드 `__init__`

- 인스턴스 객체가 생성될 때 자동으로 호출되는 메서드



### 매직 메서드(스페셜 메서드)

- Double underscore(__)를 가진 특수한 동작을 위해 만들어진 메서드

- `__str__` : print를 호출할 때 자동 호출

- ``__eq__``: ==

- ``__gt__``:  > < >= <= 부등호 연산자

  

### 클래스 메서드

- `@classmethod` **데코레이터**를 사용해서 꾸며줄 수 있음

- cls를 첫 번째 인자로 가져옴
- 함수를 어떤 함수로 꾸며서 새로운 기능을 부여

- 클래스는 self 사용이 불가능
  - 인스턴스 메서드는 cls 사용가능

```python
class Person:
    count = 0
    def __init__(self, name):
        self.name = name
        Person.count +=1

    @classmethod
    def __str__(cls):
        return f'인구수는 {cls.count}'

    @classmethod
    def number(cls):
        print(f'안녕하세요 {cls.count}')

person = Person('아이유')
person = Person('이찬혁')
person.number()     #안녕하세요 2
print(person.count) #2
print(person)       #인구수는 2
```





### 데코레이터

@모자를 씌워서 함수를 변환시키기



#### 인스턴스와 클래스 간의 이름 공간



### 객체지향의 핵심 개념 4가지

- 추상화 -> 복잡한 것을 숨기고, 필요한 것 보여줌
- 상속 -> 부모자식클래스, 물려받고 재사용가능
- 다형성 ->이름은 같은데 다른 동작->오버라이딩
- 캡슐화 ->민감한 정보 숨김



### 객체

| 정보          | 행동            |
| ------------- | --------------- |
| 클래스 변수   | 클래스 메서드   |
| 인스턴스 변수 | 인스턴스 메서드 |
|               | 스테틱 메서드   |





### 상속

extends = 상속

- 모든 클래스는 object를 상속받음

- 상속 문법 : `class ChildClass(ParentClass)`

- childClass는 ParentClass에 정의된 속성, 행동 ,관계 및 제약 조건 모두 상속받는다.



#### 상속관련 함수와 메서드

- isinstance(object, classinfo): classinfo의 instance거나 cubclass*인 경우 True

- issubclass(class, classinfo): class가 classinfo의 cubclass면 True
- `super()`: 자식클래스에서 부모클래스를 사용하고 싶은 경우
  - `super().__init__(name, age, number, email)`

- mro 메서드(Method Resolution Order)

  ​	해당 인스턴스의 클래스가 어떤 부모클래스를 가지는지 확인하는 메서드

  

#### 상속 정리

- 파이썬의 모든 클래스는 object로 부터 상속됨
- `super()`를 통해 모든 부모클래스의 요소를 호출 할 수 있음
- 메서드 오버라이딩을 통해 자식클래스에서 재정의 가능함
- 상속관계에서의 이름공간은 `인스턴스`>`자식클래스`>`부모클래스` 순으로 탐색



#### 다중상속

- 먼저 상속 받는 이름이 우선이다.
  - 왜나하면 계속 덮어씌워지는데, ()파라미터의 뒤쪽부터 들어오기 때문



#### 다형성(Polymorphism)

- 여러 모양을 뜻하는 그리스어
- 동일한 메서드가 클래스에 따라 다르게 행동할 수 있음
  - 인스턴스 메서드



### 메서드 오버라이딩

override = 덮어쓰기

- 상속받은 메서드를 재정의 하는 것

```python
class Person:
    def __init__(self, name):
        self.name = name
    def talk(self):
        print("안뇽하세요")
        
class child(Person):
    def talk(self):
        super().talk()
        print("전 아이에요")
```

- 메서드 오버로딩이 없는 없는 이유
  - *args를 쓰면 된다!! 와!!





## 캡슐화

#### 접근제어자 종류

- Public Access Modifier
  - 언더바 없이 시작하는 메서드나 속성
  - 어디서나 호출 가능, 하위 클래스 override 허용
- Protect Access Modifier
  - 언더바 1개로 시작하는 메서드나 속성
  - 암묵적인 규칙에 의해 부모 클래스 내부와 자식 클래스에서만 호출 가능
  - 하위 클래스 override 허용
- Private Access Modifier
  - 언더바 2개로 시작하는 메서드나 속성
  - 본 클래스 내부에서만 사용이 가능
  - 하위클래스 상속 및 호출 불가능(오류)
  - 외부 호출 불가능(오류)



#### getter 메서드와 setter 메서드

- 변수에 접근할 수 있는 메서드를 별도로 생성
  - getter 메서드: 변수의 값을 읽는 메서드
    - @property 데코레이터 사용
  - setter 메서드: 변수의 값을 설정하는 성격의 메서드
    - @변수.setter 사용

```python
class Person:
    def __init__(self, age):
        self._age = age
        
    @property
    def age(self):
        return self._age
    
    @age.setter
    def age(self, new_age):
        if new_age <= 19:
            raise ValueError('Too Young')
            return
        self._age = new_age
        
print(p1.age) ## 자동으로 property가 실행된다.
p1.age = 19 ## 자동으로 setter가 실행된다. __가 없어도 @setter로 구동된다.
```

