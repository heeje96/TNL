# 🎆Algorithm_기초



### 목차

- 알고리즘
- 배열
- 버블정렬 (Bubble sort)
- 카운팅 정렬 (Counting Sort)
- 완전 검색
- 그리디 (Greedy ALgorithm)



## 🧵 알고리즘이란?

- 문제를 해결하기 위한 절차나 방법
- 표현하기 위한 방법
  - 의사코드, 순서도
- APS과정의 목표 중의 하나는 **보다 좋은 알고리즘**을 이해하고, 활용하는 것!!
- 보다 좋은 알고리즘이란?
  - 정확성
  - 작업량 : 빠른 속도
  - 메모리 사용량 : 적은 메모리
  - 단순성
  - 최적성 : 개선할 여지 없이 최적화
  - 이지만~ 본인에게 좋은 알고리즘이 최고다!
- **시간복잡도**(빅-오(O))를 측정하기위해 실행되는 명령문의 개수를 계산
  - ex) `O( 3n + 2 ) = O(n)` 최고차항을 제외한 것과 계수는 다 지워버린다



## 🧵 완전검색(Exaustive Search)

- 완전 검색 방법은 문제의 해법으로 생각할 수 있는 **모든 경우의 수를 나열해보고 확인**하는 기법이다.

- Brute-force 혹은 Generate-and-test 기법이라고도 불리 운다.

- 모든 경우의 수를 테스트 한 후, 최종 해법을 도출한다.

  - 수행속도는 느리지만, 해답을 찾아내기 유리하다.

- 일반적으로 **경우의 수가 작을 때 유용**하다.

  

## 🧵 순열

- 서로 다른 것들 중 몇 개를 뽑아서 한 줄로 나열하는 것

- 서로 다른 n개 중 r개를 택하는 순열은 `nPr`와 같이 표현한다.

- `nPr = n!` 다음과 같은 식이 성립한다.

  ```python
  nPr = n * (n-1) * (n-1) * ... * (n - r + 1)
  ```

- 단순하게 순열을 생성하는 함수

  ```python
  for i1 in range(1, 4):
      for i2 in range(1, 4):
          if i2 != i1:
              for i3 in range(1, 4):
                  if i3 != i1 and i3 != i2
                     #.....
  ```

  

## 🧵 탐욕(Greedy)알고리즘

- 탐욕 알고리즘은 최적해를 구하는 데 사용되는 근시안적인 방법

- 여러 경우 중 하나를 결정할 때마다 그 순간에 최적이라고 생각되는 것을 구한다.

- **동작 과정**

  1. 현재 상태에서 부분 문제의 최적 해를 구한 뒤, 이를 부분해집합(Solution Set)에 추가한다.

  2. 실행 가능성 검사 : 새로운 부분해 집합이 실행 가능한지를 확인한다. 곧 문제의 제약 조건을 위반하지 않는지를 검사한다.

  3. 해 검사 : 새로운 부분해 집합이 문제의 해가 되는지를 확인한다.

     아직 전체문제의 해가 완성되지 않았다면 1)의 해 선택부터 다시 시작한다. 


