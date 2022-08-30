# Django

# 장고란?

서버를 구현하는 웹 프레임 워크

### 규약

- 니가 만든건 앞으로 원래있던건 뒤로

### 서론

- 장고에는 규약이 존재한다.
  
    → 안정적이다, 기본 보안이 좋다.
    
- 정부쪽은 자바스프링, 화해, 토스 두나무 등은 장고
- 웹은 클라이언트-서버구조로 되어있다.
- 정적 웹페이지와 동적 웹페이지
    - 정적 : 모든 사용자에게 **동일한 모습**으로 전달되는 웹페이지
    - 동적 : 사용자의 **요청에 따라 수정**이되어 전달되는 웹페이지
        - 웹페이지의 내용을 바꿔주는 주체 = **서버**
        - 서버에서 동작하고 있는 프로그램이 웹페이지를 변경해준다. 이렇게 **사용자의 요청을 받아서 적절한 응답**을 만들어주는 프로그램을 **쉽게** 만들 수 있게 도와주는 프레임워크가 바로 Django

## Django 구조 이해하기 (MTV Design Pattern)

### Design Pattern이란?

- 자주 사용되는 구조가 있다는 것을 알게되었고, 이를 패턴화 한 것
- 특정 문맥에서 공통적으로 발생하는 문제를 해결하는데 형식화 된 가장 좋은 관행

### Django에서의 디자인 패턴

- 장고에서는 **MTV패턴**이 쓰이고**, MVC 패턴을 조금 변형한 것이다.**

### MVC 소프트웨서 디자인 패턴

- Model Vew Controller의 준말
- 하나의 큰 프로그램을 세가지 역할로 구분한 개발 방법론
    1. Model: 데이터와 관련된 로직**(저장, 삭제, 수정)**을 관리
    2. View: 레이아웃과 화면을 처리 **(html)**
    3. Controller: 명령을 **model(DB)**과 **view** 부분으로 연결 **(분석파트)**
        1. ~~모델 명령과 뷰 명령을 나눠서 가져서… . .. ..~~
- MVC 소프트웨어 디자인패턴의 목적
    - 관심사 분리
    - 더 나은 업무의 분리와 향상된 관리 제공
    - 독립적으로 개발할 수 있다. == 유지보수 쉬워짐, 다수의 멤버로 개발 용이
- MVC = Model, View, Controller
- MTV = Model, Template, View(=Controller)
    - View(=Controller)
        - Model & Template과 관련된 로직을 처리해서 응답을 반환
        - 클라이언트의 요청에 처리를 분기하는 역할
        - 동작 예시: 데이터가 필요하다면 mode에 접근해서 데이

### 디자인패턴 요약도

![Untitled](Django%206e2199b8577845ba9fe087029e262d59/Untitled.png)

1. URLS 경로설정
2. 처리데이터
3. 새로운 HTML만드는 것 = Template
4. 다시 View가 내보낸다.

### 가상환경 생성

- git bash 가상환경 세팅

```bash
python -m venv venv
#가상환경생성: venv= 파이썬명령어 venv= 가상환경 이름

source venv/Scripts/activate  #가상환경생성
pip install django==3.2.15    #장고설치
pip freeze > requirements.txt #설치된 버전리스트를 저장하는 txt파일 생성

deactivate #가상환경 해제

django-admin startproject firstpjt . #프로젝트 이름에는 사용중인 키워드 및 '-'사용불가
#'.'을 붙이지 않을 경우 현재 디렉토리에 프로젝트 디렉토리를 새로 생성하게 됨 

python manage.py runserver #서버 구동
# http://127.0.0.1:8000/를 통해 확인

python manage.py startapp articles #애플리케이션(앱)생성, 일반적으로 복수형으로 작성한다.
# $INSTALLED_APPS에 생성 후 적어야함$ 미리 작성하고 생성하면 앱이 생성되지 않음
# articles = 앱이름
```

### 프로젝트 구조

pjt속 python파일 구조

- `asgi.py` = Asynchronous Server Gateway Interface
  
    장고 애플리케이션이 비동기식 웹 서버와 연결 및 소통하는 것을 도움
    
- **`settings.py`**
  
    장고 프로젝트 설정을 관리
    
    - INSTALLED_APPS = Django installation에 활성화 된 모든 앱을 지칭하는 문자열 목록
- `**urls.py**`
  
    사이트 url과 적절한 views의 연결을 지정
    
    - 
- `wsgi.py` = Web Server Gateway Interface
  
    장고 애플리케이션이 웹서버와 연결 및 소통하는 것을 도움
    
- `manage.py`
  
    장고 프로젝트와 다양한 방법으로 상호작용하는 커맨드라인 유틸리티
    

### 애플리케이션 구조

migrations속 파일구조

- `__init**__**.py`
- `admin.py`
- `apps.py`
- `models.py`
- `test.py`
- `view.py`

### 기타) git ignore

1. git init
2. .git폴더가 있는 곳으로 가서
3. .gitignore 파일을 만들어서 입력
   
    ```bash
    venv/
    ```
    

### 요청과 응답

URL → VIEW → TEMPLATE로 데이터흐름을 이해하기

1. `urls.py` 파일 속 path를 설정해준다.
    1. `from articles import views` 
    2. `path(’index/’, views.index)`  path(경로이름, 함수이름)
2. #경로있으면 views.py로가서 index처리한다.  #경로없으면 404
3. `views.py`에서 `return render(request, ‘index.html’)` 하면 Template로 넘어간다.
   
    ```bash
    def index(request):
        return render(request, 'index.html')
    ```
    
    - render(request, template_name, context)
        - 주어진 템플릿을 주어진 컨텍스트 데이터와 결합하고 렌더링 된 텍스트와 함께 HttpResponse(응답) 객체를 반환하는 함수
    - view에 파일을 만들 때 request를 첫번째 매개변수로 받는 것이 컨벤션이다.

앱 및에 templates폴더가 있는 것이 규약이다. 그 안에 index가 존재해야한다.

## Django Template

### Django Template Language(DTL)

- Django template에서 사용하는 built-in template system
- 조건, 반복, 변수 치환, 필터 등의 기능을 제공
    - **Python 코드로 실행되지 않음**
- 프로그래밍적 로직이 아닌 프레젠테이션을 표현하기 위한 것임을 명심

### DTL Syntax

1. Variable 변수 `{{ variable }}`
    - dot(.)를 사용하여 변수 속성에 접근할 수 있음
    - render()의 세번째 인자로{’key’:value}와 같이 딕셔너리 형태로 넘겨준다.
2. Filters 필터 `{{ variable|filter }}`
    - 표시할 변수를 수정할 때 사용
    - 예시) name 변수를 모두 소문자로 출력 `{{ name|lower }}`
    - chained가 가능하며 일부 필터는 인자를 받기도 함 `{{ name|truncatewords:30 }}`
3. Tag 태그 `{% tag %}`
    - 출력 텍스트를 만들거나, 반복 또는 논리를 수행하여 제어흐름을 만드는 등 변수보다 복잡한 일들을 수행
    - 일부 태그는 시작과 종료 태그가 필요 `{% if %}{% endif %}`, `{% for %}{% endfor %}`
    - 한줄 주석 `{# #}` , `{% comment %}{% endcomment %}`
    

## Template inheritance 템플릿 상속

- 템플릿 상속은 코드의 재사용성에 초점을 맞춘다.
- 상속을 사용하면 사이트의 모든 공통 요소를 포함하고, 하위 템플릿이 재정의(override)할 수 있는 블록을 정의하는 기본 ‘skeleton’템플릿을 만들 수 있음

`{% extends '' %}`

- **자식(하위)템플릿이 부모 템플릿을 확장한다는 것을 알림**
- 반드시 템플릿 **최 상단**에 작성되어야함(즉, 2개 이상 사용할 수 없음)

`{% block content %}{% endblock content %}`

- **하위템플릿에서 재지정(overridden)할 수 있는 블록을 정의**
- 즉, 하위 템플릿이 채울 수 있는 공간
- 가독성을 높이기 위해 선택적으로 endblock 태그에 이름을 지정할 수 있음

### 템플릿 경로 추가하기

앱안의 template디렉토리가 아닌 프로젝트 최상단의 templates 디렉토리 안에 위치시키고 싶다면?

`settings.py` → `TEMPLATES=[…{**’DIRS’: [BASE_DIR / ‘templates’, …}]**`,

- BASE_DIR : 프로젝트가 생성된 디렉토리

기타

- 지금 만들던 것은 완성된 html이 아니기때문에 template을 만들었다고 이야기한다.

## Sending and Retrieving form data

- “데이터를 어디(action)로 어떤 방식(method)으로 보낼지”
- HTML form element를 통해 사용자와 애플리케이션 간의 상호작용 이해하기
- 웹에서 사용자 정보를 입력하는 여러방식(text, button, submit 등)을 제공하고, 사용자로부터 할당된 데이터를 서버로 전송하는 역할을 담당

### 핵심속성

- action
    - 입력 데이터가 전송 될 URL을 지정
    - 데이터를 어디로 보낼 것인지 지정하는 것이며 이 값은 반드시 유효한 URL이여야함
    - 속성을 지정하지 않으면 데이터는 현재 form이 있는 페이지의 URL로 보내짐
- method
    - 데이터를 어떻게 보낼 것인지 정의
    - 입력 데이터의 HTTP request method를 지정
    - HTML form 데이터는 오직 2가지 방법으로만 전송 할 수 있는데 바로 GET방식과 POST방식

### 예제

- throw

```bash
{% extends 'base.html' %}
{% block content %}
    <h1>Throw</h1>
    <form action="/catch/" method="GET">
        <label for="message">Throw</label>
        <input type="test" id="message" name="message">
        <input type="submit">
    </form>
{% endblock content %}
```

- catch

```bash
{% extends 'base.html' %}
{% block content %}
    <h1>Catch</h1>
    <h2>여기서 {{ message }}를 받았어</h2>
    <a href="/throw/">다시 던지러가자</a>
{% endblock content %}
```

## Django URLs

“Dispatcher(운행관리원)로서의 URL 이해하기”

웹 어플리케이션은 URL을 통한 클라이언트의 요청에서부터 시작함

### Trailing Slashes

### Variable routing

- URL의 일부를 변수로 지정하여 view 함수의 인자로 넘길 수 있음
- 즉, 변수 값에 따라 하나의 path()에 여러 페이지를 연결 시킬 수 있음

```
//urls.py
path('hello/<name>/', views.hello),
```

### App URL mapping(1/3)

- 앱이 많아졌을 때 urls.py를 각 app에 매핑하는 법을 이해하기
- 두번째 app인 pages를 생성 및 등록하고 진행
- app의 view함수가 많아지면서 사용하는 path()또한 많아지고, app또한 더 많이 작성되기 때문에 프로젝트의 urls.py에서 모두 관리하는 것은 프로젝트 유지보수에 좋지 않음

- 하나의 프로젝트의 여러앱이 존재한다면, 각각의 앱 안에 urls.py를 만들고 프로젝트 urls.py에서 각 앱의 urls.py파일로 URL 매핑을 위탁할 수 있음
- 각각의 app 폴더 안에 urls.py를 작성하고 다음과 같이 수정 진행

### 과제

- 부트스트랩을 열어서, 네브바를 찾아서 첫번째 네브바를 디너html에 적용하세요.

```bash

```

---