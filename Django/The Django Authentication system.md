# The Django Authentication system

### 개요

- Django authentication system(인증 시스템)은 인증(Authentication)과 권한(Authoriztion)부여를 함께 제공(처리)하며, 이러한 기능을 일반적으로 인증 시스템이라고 함

- 필수 구성은 settings.py에 이미 포함되어 있으며, INSTALLED_APPS에서 확인가능`django.contrib.auth`

  

- Authentication (인증)

  - 신원확인 (사용자가 자신이 누구인지 확인하는 것)

- Authoriztion (권한, 허가)

  - 권한부여 (인증된 사용자가 수행할 수 있는 작업을 결정)



### 사전 설정

```python
$python manage.py startpapp accounts

#settings.py
INSTALLED_APPS = [
    'accounts',
    ...
]
```



## Substituting a custom User model

### 개요

- **'Custom User Model'**로 대체하기
- 기본 User Model을 필수적으로 Custom User model로 대체하는 이유 이해하기
- Django는 기본적인 인증 시스템과 여러가지 필드가 포함된 User Model을 제공, 대부분의 개발 환경에서 기본 User Model을 Customer User로 대체함



### 개요



### AUTH_USER_MODEL

- 프로젝트에서 User를 나타낼 때 사용하는 모델
- `django.contrib.auth`앱에 기본 User모델이 있다.
- 이것을 "Custom User model로 대체하기"

**[참고]** setting.py는 global_settings.py에서 상속받는다. aurh앱도 마찬가지!





**[참고]** `AbstractUser` 관리자 권한과 함께 완전한 기능을 가지고 있는 User model을 구현하는 추상 기본클래스

- 테이블로 만들어지진 않지만, 다른 상속하위클래스에게 본인의 기능을 주기위한 클래스

  

### 대체하기

1. AbstractUser를 상속받는 커스텀 User 클래스 작성 (기본 User클래스를 덮어씌운다.)
2. settings.py에서 `AUTH_USER_MODEL = 'accounts.User'`
3. admin.py에 커스텀 User 모델을 등록
   - 기본 User 모델이 아니기 때문에 등록하지 않으면 admin site에 출력되지 않음



### [주의] 프로젝트 중간에 AUTH_USER_MODEL 변경하지마라 (프로젝트 처음에 진행하기)



### 데이터베이스 초기화

- 데이터베이스 초기화 후 마이그래이션

1. migration 파일 삭제 (폴더나 `__init__.py`은 삭제하지 않음)
2. db.sqlite3 삭제
3. migration 진행





## HTTP Cookies

### HTTP특징

- 비 연결 지향(connectionless) : 응답 후 연결을 끊음
- 무상태 (stateless) : 연결을 끊는 순간 서버와의 통신이 끝나며, 유지되지않음
- 서버와 클라이언트 간 지속적인 상태유지를 위해 **"쿠키와 세션"**이 존대한다. (쿠키 > 세션)

### Cookie

**개요**

- HTTP 쿠키는 상태가 있는 세션을 만들도록 해준다.
- **서버**가 사용자의 웹 브라우저에 전송하는 작은 데이터 조각이다.
- 사용자가 웹사이트를 방문할 경우 해당 웹사이트의 서버를 통해 사용자의 컴퓨터에 설치되는 작은 기록정보 파일
  - 브라우저는 쿠키를 로컬에 **KEY-VALUE**의 데이터 형식으로 저장
  - 이렇게 쿠키를 저장해 놓았다가, 동일한 서버에 재요청 시 저장된 쿠키를 함께 전송
- 쿠키는 두 요청이 동일한 브라우저에서 들어왔는지 아닌지를 판단할 때 주로 사용됨
  - 이를 이용해서 사용자의 **로그인 상태를 유지**할 수 있음
  - 상태가 없는 HTTP프로토콜에서 상태정보를 기억시켜준다.
- 즉, 웹페이지에 접속하면 쿠키를 브라우저에 저장하다가 클라이언트가 같은 서버에 재 요청시마다 요청과 함께 저장해두었던 쿠카도 함께 전송한다.
- 



### 쿠키 사용 목적

1. **세션 관리(Session management)**
   - 로그인, 아이디 자동완성, 공지하루 안보기, 팝업체크, 장바구니 등의 정보관리
2. 개인화(Personaliztion)
   - 사용자 선호, 테마 등의 설정
3. 트래킹(Tracking)
   - 사용자 행동을 기록 및 분석

### Session 세션

- 사이트와 특정 브라우저 사이의 'state(상태)'를 유지시키는 것
- 클라이언트가 서버에 접속하면 서버가 세션ID를 발급하고, 클라이언트는 session id를 쿠키에 저장
- 클라이언트가 다시 동일한 서버에 접속하면 요청과 함께 쿠키(session id가 저장된)를 서버에 전달
- session id는 session을 구별하기 위해 필요하며, **쿠키에는 session id만 저장**

### 쿠키 Lifetime (수명)

1. Session cookie
   - 현재 세션이 종료되면 삭제됨
   - 브라우저 종료와 함께 삭제됨
2. Persistent cookies
   - Expires 속성에 지정된 날짜 혹은 Max-Age속성에 지정된 기간이 지나면 삭제됨

- session에는 수명이 존재한다.



### Session in Django

- Django는 `database-backed session` 저장방식을 기본값으로 사용

  - 세션 정보는 `django_session 테이블`에 저장됨

- Django는 특정 session id를 포함하는 쿠키를 사용해서 각각의 브라우저와 사이트가 연결된 session을 알아냄

- Django에서는 인증에 관련된 사용자 요청 폼을 만들어놓았다. 

  이를 통해 우리가 session 메커니즘 대부분을 생각하지 않게 도움을 줌



### Login

로그인은 Session을 Create하는 과정

#### AuthenticaionForm

- 로그인을 위한 built-in form
  - 로그인하고자 하는 사용자 정보를 입력받음
  - 기본적으로 username과 password를 받아 데이터가 유효한지 검증
- **request를 첫번째 인자로 취함**

```python
#views.py
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login as auth_login #로그인이 중복되어 이름을 변경해줌

def login(request):
    #로그인이 되어있는 경우 로그인창으로 못가게하는 구문
    if request.user.is_authenticated:
        return redirect('articles:index')
    
    if request.method == 'POST': # 데이터가 오면
        # 인증과정
        form = AuthenticationForm(request, request.POST) # [date=]request.POST
        if form.is_valid():
            # 로그인
            auth_login(request, form.get_user())  #실제 로그인
            return redirect('articles:index')
    else:# 로그인 안함, 기본페이지
        form = AuthenticationForm()
    context = {
        'form': form,}
    return render(request, 'accounts/login.html', context)
```

```python
login(request, user, backend=None)
#인증된 사용자를 로그인 시키는 로직
#HttpRequst객체와 User객체가 필요하다.

form.get_user()
#AuthenticationForm의 인스턴스 메서드
#유효성 검사를 통과했을 경우 로그인 한 사용자 객체를 반환한다. 
```



[잡담] 브라우저는 생각보다 보안에 강하다. <- 생각보다 ..?



## Authentication with User

`{{ user }}`

- settings.py의 context processors 설정값 **'`auth`'** 때문에 **모든 템플릿**에서 사용가능하다.
- 로그인을 하지 않은 경우 `AnonymousUser`(인증되지 않은 사용자)가 출력됨.



## Logout

**개요**

로그아웃은 Session을 Delete하는 과정



### logout(request)

- httpRequest 객체를 인자로 받고 **반환값이 없음**

- 사용자가 로그인 하지 않은 경우 오류를 발생시키지 않음

- 다음 2가지 일을 처리한다.

  1. 현재 요청에 대한 **session data를 DB에서 삭제**
  2. **클라이언트의 쿠키에서도 sessionid**를 삭제

  - 이는 다른사람이 동일한 웹 브라우저를 사용하여 로그인하고, 이전 사용자의 세션 데이터에 액세스하는 것을 방지하기 위함이다.

```python
def logout(request):
    # 로그아웃
    auth_logout(request)
    return redirect('articles:index')
```





# Authentication with User

### 개요

- User Object와 User CRUD에 대한 이해
  - 회원 가입, 회원 탈퇴, 회원정보 수정, 비밀번호 변경



### 회원가입 singup

개요

- 회원가입은 User를 **Creat**하는 것이며, `UserCrationForm buit-in form`을 사용

### `UserCrationForm`

- 주어진 username과 password로 권한이 없는 새 user를 생성하는 ModelForm
- 3개의 필드를 가짐
  1. username(from the user model)
  2. password1
  3. password2

```python
#views.py
from .forms import CustomUserCreationForm

def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST) #회원가입
        # form = UserCreationForm(request.POST)
        # UserCreationForm은 auth.User 모델폼으로 만들어져있기 때문에,
        # accounts.User에서 사용이 불가능해서  대체해준다.
        if form.is_valid():
            form.save()
            return redirect('articles:index')
    else:
        form = CustomUserCreationForm() #회원가입 폼
    context = {
        'form': form,
    }
    return render(request, 'accounts/signup.html', context)
```

```python
# forms.py
# 두 form 모두 class Meta: model = User가 등록된 form이기 때문에 반드시 커스텀해야함

from django.contrib.auth import get_user_model # 유저모델을 가져와준다.
from django.contrib.auth.forms import UserCreationForm, UserChangeForm # 상속받을 기본폼

class CustomUserCreationForm(UserCreationForm): # 회원 생성

    class Meta(UserCreationForm.Meta): # 메타클래스를 상속받아서, 바꿔야할 부분만 바꾼다.
        model = get_user_model()
        # model = User 처럼 직접 참조를 권장하지 않는다.

        #option 예시
        fields = UserCreationForm.Meta.fields + ('email') # 이메일을 받는다. 
        # 주의: 유저모델에 있는 col로 써야한다.

        
class CustomUserChangeForm(UserChangeForm): # 회원정보 수정

    class Meta(UserChangeForm.Meta):
        model = get_user_model()
        
        # 모든 정보를 open하면, 권한이 보여지므로 선택해서 보여줘야 한다.
        fields = ('email', 'first_name', 'last_name',) 
```



### AbstractBaseUser의 모든 subclass와 호환되는 forms

- 아래 Form 클래스는 User 모델을 대체하더라도 커스텀하지 않고 사용가능
  1. AuthenticationForm
  2. SetPasswordForm 
  3. PasswordChangeForm
  4. AdminPasswordChangeForm
- 기존 User모델을 참조하는 Form이 아니기 때문이다.



### 회원탈퇴 delete

**개요**

DB에서 유저를 Delete하는 것과 같다.

**탈퇴로직**

```python
def delete(request):
    request.user.delete() #데이터 삭제
    #auth_logout(request) #로그아웃을 먼저 해버리면, 어떤 데이터를 삭제할지 모르게 된다.
    return redirect('articles:index')

#데코레이터 사용의 경우(POST 메소드만 허락한다.)
@require_POST
def delete(request):
    if request.user.is_authenticated:
        request.user.delete()
        auth_logout(request)
    return redirect('articles:index')
```

세션리턴은 남아있다.



### 회원정보수정

#### `UserChangeForm`

- 사용자의 정보 및 권한을 변경하기 위해 **admin** 인터페이스에서 사용되는 **model Form**이다.
- UserChangeForm 또한 ModelForm이기 때문에 instance인자로 기존 User 데이터 정보를 받는 구조 또한 동일함
- **비밀정보 설정은 관여하지 않음**

```python
@login_required
@require_http_methods(['GET', 'POST'])
def update(request):
    if request.method == 'POST':
        form = CustomUserChangeForm(request.POST, instance=request.user)
        # form = CustomUserChangeForm(data=request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('articles:index')
    else:
        form = CustomUserChangeForm(instance=request.user)
    context = {
        'form': form,
    }
    return render(request, 'accounts/update.html', context)
```





### 비밀번호변경

#### `PasswordChabgeForm`

- 사용자가 비밀번호를 변경할 수 있도록 하는 Form
- 이전 비밀번호를 입력하여 비밀번호를 변경할 수 있도록 함
- 이전 비밀번호를 입력하지 않고 비밀번호를 설정할 수 있는 `SetPasswordForm`을 상속받는 서브클래스

```python
@login_required
@require_http_methods(['GET', 'POST'])
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        # form = PasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)#session data를 업데이트 해준다.
            return redirect('articles:index')
    else:
        form = PasswordChangeForm(request.user)
    context = {
        'form': form,
    }
    return render(request, 'accounts/change_password.html', context)
```

- 암호 변경 시 세션이 무효화되는 이유
  - 비밀번호가 변경되면 기존 세션과 회원의 인증 정보가 일치하지 않게 되어버려 로그인이 끊긴다.
  - update_session_auth_hash(request, form.user)
    - 암호가 변경되어도 로그아웃되지 않도록 새로운 password의 session data로 session을 업데이트







#### 로그인 사용자에 대한 접근 제한하기

1. `is_authenticated attribute`

   사용자가 인증 되었는지 여부를 알 수 있는 방법
   AnonymousUser에 대해서는 항상 **False**
   모든 User인스턴스에 대해서는 항상 **True**

```python
{% if request.user.is_authenticated %} #출력만 바꿈
#로그인 됐을 때 페이지
{% else %}
#로그인, 회원가입창
{% endif %}
```



2. `The login_required decorator`

   사용자가 로그인 되어 있으면 정상적으로 view함수를 실행,

   로그인 하지 않은 사용자의 경우엔 settings.py의 LOGIN_URL 문자열 주소로 redirect

   - [참고] LOGIN_URL의 기본 값은 /accounts/login/
   - 두번째 app이름을 accounts로 했던 이유 중 하나

```python
from django.contrib.auth.decorators import login_required
@login_required
```



### next query string parameter

- 발생할 수 있는 문제
  1. redurect과정에서 POST 요청 데이터의 손실
  2. redirect로 인한 요청은 GET요청 메서드로만 요청됨
