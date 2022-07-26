### filter 함수

- 맵오브젝트 = filter({참거짓판별}, {리스트})

```python
def odd(n):
    return n % 2
n = [1,2,3,4]
print(list(filter(odd, n)))
```



### zip

```python
a = [1,2,3]
b = [3,2,1]
print(list(zip(a, b)))
```



### Scope

#### 이름 검색 규칙

- 파이썬에서 사용되는 식별자들은 namespace에 저장되어있음
- 아래와 같은 순서로 이름을 찾아나가며, LEGB Rule이라고 부름
  - local scope
  - enclosed 
  - global
  - built-in 
    - ex) print()



### Module

```python
#모듈
import module
from module import var, function, Class
from module import *
#패키지
from package import module
from package.module import var, function, Class
```

