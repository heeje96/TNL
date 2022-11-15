# Vue with DRF

날짜: 2022년 11월 14일 오후 2:07
속성: Vue

# Cross-Origin Resource Sharing

- 추가 HTTP Header를 사용하여, 특정 출처에서 실행 중인 웹 어플리 케이션이 다른 출처의 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제
    - 어떤 출처에서 자신의 컨텐츠를 불러갈 수 있는지 서버에 지정할 수 있는 방법
- 리소스가 자신의 출처와 다를 때 교차출처 HTTP 요청을 실행
    - 만약 다른 출처의 리소스를 가져오기 위해서는 이를 제공하는 서버가 브라우저에게 다른출처지만 접근해도 된다는 사실을 알려야 함
    - “교차 출처 리소스 공유 정책(CORS policy)”

### CORS policy

- 다른 출처에서 온 리소스를 공유하는 것에 대한 정책
- 다른 출처의 리소스를 불러오려면 그 출처에서 올바른 CORS header를 포함한 응답을 반환해야 함

### How To set CORS

- HTTP Response Header를 통해 이를 통제가능
- HTTP Response 예시
    - Access-Control-Allow-Origin
        - 단일 출처를 지정하여 브라우저가 해당 출처의 리소스에 접근하도록 허용

### Django-cors-headers library 사용하기

- django-cors-headers github에서 내용 확인
- 응답에 CORS header를 추가해주는 라이브러리
- 다른 출처에서 Django 애플리케이션에 대한 브라우저 내 요청을 허용함

- 라이브러리 설치 및 requirements.txt 업데이트
    
    ```jsx
    pip install django-cors-headers
    pip freeze > requirements.txt
    ```
    
- App 추가 및 MIDDLEWARE추가 주석 해제
    - 주의 ) CorsMiddleware는 가능한 CommonMiddleware보다 먼저 정의되어야함
    
    ![Untitled](Vue%20with%20DRF%20f8ac2523331f468083bad3f16e4e30a0/Untitled.png)
    
    ![Untitled](Vue%20with%20DRF%20f8ac2523331f468083bad3f16e4e30a0/Untitled%201.png)
    

 

# Authorization

권한부여, 허가

제한, 글 조회 & 삭제 & 수정 등 권한

403 - 권한없음

401 - 누군지 모름

![Untitled](Vue%20with%20DRF%20f8ac2523331f468083bad3f16e4e30a0/Untitled%202.png)

User는 Token 정보를 Headers에 담아 요청과 함께 전송한다.

토큰사이의 공백도 지켜 보내야한다.

### 토큰 생성 및 관리 문제점

- 고려사항들
    1. Token생성시점
    2. 생성한 Token 관리 방법
    3. User와 관련된 각종 기능 관리 방법
        - 회원가입
        - 로그인
        - 회원 정보 수정
        - 비밀 번호 변경 등…

### Dj-Rest-Auth

인증관련 API이다.