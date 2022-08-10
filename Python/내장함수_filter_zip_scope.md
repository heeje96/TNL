### filter 

- filter(참거짓판별 함수, 리스트) = filter object
  - 리스트의 참 거짓을 판별해주는 함수
  - filter를 쓰는 경우엔 몇 갠지 알기 어려우니 map처럼 받기 어렵다.


```python
def odd(n):
    return n % 2
n = [1,2,3,4]
print(list(filter(odd, n)))
```



### zip

- zip(리스트A, 리스트B) = (리스트A[0], 리스트B[0]), (리스트A[1], 리스트B[1]), .....=zip object
  - 리스트를 튜플로 묶어주는 함수

```python
a = [1,2,3]
b = [3,2,1]
print(list(zip(a, b)))
```



lambda

- 익명함수, 변수에 저장해서 다량의 데이터를 손볼때 자주쓰인다.



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

