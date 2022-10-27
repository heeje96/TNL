# 자바스크립트 Asynchronous

날짜: 2022년 10월 26일 오전 10:31
속성: JS

# 동기와 비동기

### 동기 Synchronous

모든 일을 순서대로 처리(ex. python)

### 비동기 Asynchronous

작업의 결과를 기다리지 않고 다음 작업을 처리 (병렬적 수행)

### Axios

HTTP 웹 통신 라이브러리

# Java Script의 비동기 처리

### javaScript Runtime

- Java Script는 Single Thread 언어라, 병렬처리가 불가능하다.
- 그래서 비동기 처리를 할 수 있도록 도와주는 환경이 필요하다.
- 특정 언어가 동작 할 수 있는 환경을 **“런타임(runtime)”**이라고 한다.
- 이중 브라우저 환경에서의 비동기 동작은 크게 아래의 요소들로 구성된다.
    1. JavaScript Engine의 Call Stack
    2. Web API
        1. Node.js와 브라우저
    3. Task Queue
    4. Event Loop

### 비동기 처리 동작 방식

브라우저 환경에서의 JavaScript의 비동기는 아래와 같이 처리된다.

1. 모든 작업은 **Call Stack(LIFO)**로 들어간 후 처리됨
2. 오래 걸리는 작업이 Call Stack으로 들어오면 **Web API**로 보내 별도로 처리하도록 한다.
3. Web API 처리가 끝난 작업들은 곧바로 Call Stack으로 들어가지 못하고
    
    **Task Queue(FIFO)**에 순서대로 들어간다.
    
4. **Event Loop**가 Call Stack이 비어있는 것을 계속 체크하고, Call Stack이 빈다면 Task Queue에서 가장 오래된 (가장 앞에 있는) 작업을 Call Stack으로 보낸다.

# Axios

### Axios?

- JavaScript의 HTTP 웹통신을 위한 라이브러리
- 확장가능한 인터페이스와 쉽게 사용할 수 있는 비동기 통신 기능을 제공
- node 환경은 npm을 이용해서 설치 후 사용할 수 있고, browser 환경은 CDN(html속 들어가는 script)을 이용해서 사용할 수 있음

```jsx
<script>
axios.get('요청할 URL')
	.then(성공하면 수행할 콜백함수)
	.catch(실패하면 수행할 콜백함수)
</script>
```

### 비동기 처리의 단점

- 비동기 처리의 핵심은 Web API로 들어오는 순서가 아니라 **작업이 완료되는 순서에 따라 처리**한다는 것.
- 그런데 이는 개발자 입장에서 코드의 실행 순서가 불명확하다는 단점이 있음 → **콜백함수를 사용하여 해결**

### 콜백함수

- **다른 함수의 인자로 전달되는 함수**
- 비동기에만 사용되는 것이 아님
- 시간이 걸리는 **비동기 작업이 완료된 후 실행할 작업을 명시**하는 데 사용되는 콜백함수를 **비동기 콜백(asynchronous callback)**이라 부른다.
- 사용이유
    - 명시적인 호출이 아닌 특정 조건 혹은 행동에 의해 호출되도록 할 수 있음
    - ‘요청이 들어오면’, 이벤트가 발생하면’,’데이터들 받아오면’ 등의 조건으로 로직을 제어할 수 있음
    - **비동기 처리를 순차적으로 동작할 수 있게 함**
    - 비동기 처리를 위해서는 콜백 함수의 형태가 반드시 필요함

### 콜백 지옥

- 콜백함수는 연쇄적으로 발생하는 비동기 작업을 순차적으로 동작할 수 있게 함
- 보통 어떤 기능의 실행결과를 받아서 다른 기능을 수행하기 위해 많이 사용하는데, 이 과정을 작성하다 보면 비슷한 패턴이 계속 발생함
    - A→ callback 1 → callback 2 → callback 3….

# 프로미스 Promise

### Promise

- callback Hell문제를 해결하기 위해 등장한 비동기 처리를 위한 객체
- 작업이 끝나면 실행시킨다는 약속(promise)
- **비동기 작업의 완료 또는 실패를 나타내는 객체**
- Promise기반의 클라이언트가 Axios라이브러리
    - Promise based HTTP client for the browser and node.js”
    - 성공에 대한 약속 then()
    - 실패에 대한 약속 catch()
- 구조
    - then(callback)
        - 요청한 작업이 성공하면 callback실행
        - callback은 이전 작업의 성공 결과를 인자로 전달받음
    - catch(callback)
        - then()이 하나라도 실패하면 callback실행
        - callback은 이전 작업의 실패 객체를 인자로 전달 받음
    - then과 catch 모두 항상 promise 객체를 반환
    즉, 계속해서 chaining을 할 수 있음
    - axios로 처리한 비동기 로직이 항상 promise 객체를 반환
        
        그래서 then을 계속 이어나가면서 작성할 수 있다.
        

```jsx
work1()
	.then((result1)=>{
		return result2
	})
	.then((result2)=>{
		return result3
	})
	.catch((error)=>{
	})
```

### Promise가 보장하는 것 (vs 비동기 콜백)

- 비동기 콜백 작성 스타일과 달리 Promise가 보장하는 특징
1. callback함수는 javaScript의 Event Loop 현재 실행중인 Call Stack을 완료하기 이전에는 절대 호출되지 않음
2. Promise callback 함수는 Event Queue에 배치되는 엄격한 순서로 호출됨
3. 비동기 작업이 성공하거나 실패한 뒤 .then()메서드를 이용하여 추가한 경우에도 1번과 똑같이 동작