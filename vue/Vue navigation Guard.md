# Vue navigation Guard

날짜: 2022년 11월 10일 오전 12:15

# 네비게이션 가드

왜 쓰냐?

1. 다른 url로 redirect를 하거나 
2. URL로 접근을 막는 방법
    1. ex) 비 로그인시..

# 네비게이션 가드의 종류

### 전역가드

- 애플리케이션안에서 동작
1. **Global Before Guard**
    - **다른 url주소로 이동할 때 항상 실행**
    - router/index.js에 `router.beforeEach()`를 사용하여 설정
    - 콜백함수의 값으로 다음과 같이 3개의 인자를 받음
        1. to: 이동할 URL 정보가 담긴 Router 객체
        2. from: 현재 URL 정보가 담긴 Router 객체
        3. next 지정한 URL로 이동하기 위해 호출되는 함수
            1. 콜백 함수 내부에서 반드시 한 번만 호출 되어야 함
            2. 기본적으로 to에 해당하는 URL로 이동

### 라우터가드

- 전체 route가 아닌 특정 route에 대해서만 가드한다.
- ex. 로그인 되어있는 경우 HomeView로 이동하기
- `beforeEnter()`
    - 다른 경로에서 탐색할 때만 실행된다.
    - route에 진입했을 때 실행됨

### 컴포넌트 가드

- 라우터 컴포넌트 안에 정의
- ex. Params변화 감지
    - URL이 변하지 않았음
- `beforeRouteUpdate()`
    - 해당 컴포넌트를 렌더링 하는 경로가 변경될 때 실행