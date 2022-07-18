## Python 예약어

python에서 사용할 수 없는 식별자(예약어)를 찾아 작성하시오.

```python
import keyword
print(keyword.kwlist)
```



##  실수 비교

python은 부동소수점 방식을 이용하여 실수(float)를 표현하는 과정에서, 나타내고자 하는 값과의 오차가 발생하여 원하는 대로 연산 또는 비교가 되지 않을 때가 있다.  이를 참고하여, 아래와 같은 두 실수 값을 올바르게 비교하기 위한 코드를 작성하시오.

```python
import math
num1 = 0.1 * 3
num2 = 0.3 
print(math.isclose(num1, num2))
```



## String Interpolation

안녕, 철수야 를 string interpolation을 사용하여 출력하시오.

```python
name = '철수'
print('안녕, %s야' % name)
print('안녕, {}야'.format(name))
print(f'안녕, {name}')

import datetime
today = datetime.datetime.now()
print(today)

print(f'오늘은 {today:%y}년 {today:%m}월 {today:%d}일')

pi = 3.141592
print(f'원주율은 {pi:.3}. 반지름이 2일때 원의 넓이는 {pi*2*2}')
```



## 이스케이프 시퀀스 응용

print() 함수를 한 번만 사용하여 다음 문장을 출력하시오

```python
print('\"파일은 c:\\Windows\\Users\\내문서\\Python에 저장이 되었습니다.\”
나는 생각했다. \'cd를 써서 git bash로 들어가 봐야지.')
```

