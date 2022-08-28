# 큐 Queue

### 선형 큐

- 선입선출구조(FIFO: First In First Out)
- 머리 Front와 꼬리 Rear을 이용해 연산
  - **Front는 이미 제거된 앞쪽**(None)을 가르키고 있음
  - **Rear는 들어온 곳**을 가르키고 있음
- 기본연산
  - enQueue() : 큐의 rear 다음에 원소를 삽입하는 연산
  - deQueue() : 큐의 front에서 원소를 삭제하고 반환하는 연산
  - createQueue() : 공백상태의 큐를 생성하는 연산
  - isEmpty() : 큐가 공백상태인지를 확인하는 연산
  - isFull() : 큐가 포화상태인지를 확인하는 연산
  - Qpeek() : 큐의 앞쪽(front)에서 원소를 삭제없이 반환하는 연산
- 상태표현
  - 초기상태 front = rear = -1
  - 공백상태 front == rear
  - 포화상태 rear == n-1(n-1=배열의 마지막 인덱스)
  - 찾기 Qpeek = front+1
- 선형 큐의 문제점
  - **포화상태를 잘못인식 (rear == n-1)**
    - 해결방법 1 = 리스트를 앞으로 땡긴다 = 비효율적
    - 해결방법 2 = 원형 큐의 논리적 구조를 사용한다.

### 원형큐

front와 rear가 n-1를 가리킨 후 그 다음에는 0으로 이동함

- 상태표현
  - front = 삭제위치 front = (front + 1) % n  #n은 큐의 크기
    - 공백과 포화 구분을 쉽게하기 위해 항상 빈자리로 둔다.
  - rear = 삽입위치 rear = (rear + 1) % n
  - 초기상태 front = rear = 0
  - 포화상태 front == (rear + 1) % n
  - 공백상태 front == rear

### 우선순위 큐 Priority Queue

- 우선순위 항목들을 저장하는 큐
- FIFO가 아니라 우선순위가 높은 순서대로 나가게 된다.
- 적용분야
  - 시뮬레이션 시스템, 네트워크 트래픽 제어, 운영체제의 테스크 스케줄링
- 배열, 리스트를 이용한 우선순위 큐 (동적할당을 이용한 리스트)



### 선형 큐의 연산과정

1. createQueue() 공백 큐 생성

   [ ]

   front = -1  rear = -1

2. enQueue(A) 원소 삽입

   [ A ]

   front = -1  rear = 0

3. enQueue(A)

   [ A, B ]

   front = -1  rear = 1

4. deQueue()

   [   , B ]

   front = 0  rear = 1

5. enQueue(C)

   [   , B, C ]

   front = 0  rear = 2

   ...

6. deQueue(), deQueue()

   [ , , ]

   front = 2  rear = 2      # front 와 rear가 같으면 empty

   

### deque

`from collections import deque`

```
q.append(10)
print(q.popleft())
```



### 큐의 활용: 버퍼buffer

- 버퍼

  - 데이터를 한 곳에서 다른 한 곳으로 전송하는 동안 일시적으로 그 데이터를 보관하는 메모리의 영역
  - 버퍼링 : 버퍼를 활용하는 방식 또는 버퍼를 채우는 동작을 의미한다.

- 버퍼의 자료구조

  - 버퍼는 일반적으로 입출력 및 네트워크와 관련된 기능에서 이용된다.
  - 순서대로 입력/출력/전달되어야 하므로 FIFO 방식의 자료구조인 큐가 활용된다.

- 키보드 버퍼

  1. `A` + `P` + `S` + `\n` : 사용자 키보드 입력

  2. `A` + `P` + `S` + `\n` : 키보드 입력 버퍼
  3. 키보드 입력 버퍼에 Enter 키 입력이 들어오면
  4. `\n` + `S` + `P` + `A`  : 연산 ( 프로그램 실행 영역 )