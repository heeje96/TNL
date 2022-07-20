### 가변 키워드 인자(`**kwargs`)

- 몇 개의 키워드 인자를 받을 지 모르는 함수를 정의할 때 유용
- dict 형태로 변환



### scope

Global scope : 코드 어디에서든 참조할 수 있는 공간

local scope : 함수가 만든 scope. 함수 내에서만 참조 가능



### variable

global variable : global scope에 정의된 변수





### lambda 함수

```python
#기존
def triangle_area(b, h):
    return 0.5 * b * h

#람다
triangle_area = lambda b, h : 0.5 * b * h
```

---

### 재귀 함수

예시: 4!

---



### 라이브러리를 받는 것:  PIP

pypi에 저장된 패키지들을 설치하도록 도와주는 패키지 관리 시스템

```
$ pip list
$ pip show SomePackage

#txt 파일에 박제해두고(저장), 한번에 받기
$ pip freeze > requirements.txt #박제(저장)
$ pip install -r requirements.txt #박제된 것들을 전부 설치

```



---

### 모듈

모듈: 특정 기능을 하는 코드를 파이썬 파일(.py) 단위로 저장한 것

패키지: 모듈의 집합, 패키지 속 패키지 (모듈 폴더 느낌)

```py
import module
from module import var, function
from module*
from package import module
from package.module import var
```









