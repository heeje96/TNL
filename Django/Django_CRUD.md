# Django CRUD

# Django 코드

### **1. 가상환경 세팅**

```bash
#주요 코드 순서대로 따라하기
python -m venv venv           #가상환경설치
source venv/Scripts/activate  #가상환경접속
pip install django==3.2.15    #장고설치
pip freeze > requirements.txt #설치된 버전리스트를 저장하는 txt파일 생성

django-admin startproject firstpjt . #프로젝트 생성
python manage.py startapp articles   #애플리케이션(앱)생성
# 생성 후 INSTALLED_APPS에 앱이름 등록
# INSTALLED_APPS = [
#    'articles',
#		 ...
#		 ]
python manage.py runserver #서버 구동 http://127.0.0.1:8000/를 통해 확인

#기타
pip install -r requirements.txt #requirements에 있는 내용 설치
deactivate #가상환경 해제
```

### **2. `.gitignore` 파일 생성**

생성 후 파일에 `venv/`를 적어주거나, `.git` 위치에 이 파일 첨부

[.gitignore](Django%20CRUD%20d28b365fbadd4961bf803d68c1e55fba.gitignore)

### 3. `Model.py`

1. app/models.py에 데이터베이스 구조(모델)을 작성한다.

```python
from django.db import models

class Article(models.Model): # models.Model을 상속받아서 사용한다.
    title = models.CharField(max_length=10) # CharField 같은 것들이 있다.
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self): #
        return self.title
```

1. bash에서 model과 DB를 동기화시켜준다.

```bash
**$python manage.py makemigrations # 중요! 설계도를 생성하는 일
$python manage.py migrate # 중요! DB와 동기화하기**

#기타
$python manage.py showmigrations # migrations 파일이 migrate가 제대로 됐는지 확인하는 용도 
$python manage.py sqlmigrate articles 0001 # 해당 migrations파일이 SQL문으로 어떻게 해석 될 지 미리 확인 할 수 있음
```

### 4**. templates/`Base.html` 세팅**

1. 최상단 위치(앱)에  **templates/`Base.html`** 생성
2. base.html파일 작성

```html
<!DOCTYPE html>
...
<body>
    {% block content %}   
		<!--대치 될 위치-->
		{% endblock content %}
</body>
...
```

1. crud/`settings.py` 설정 변경

```python
TEMPLATES = [
    {
        ...
        'DIRS': [BASE_DIR / 'templates',], #메인 디렉토리의 templates를 참조한다. 
        ...
    },
]
```

1. crud/ `urls.py` 작성

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('articles/', include('articles.urls')), #참조할 앱의 이름과 경로설정
]
```

1. appname/templates/`appname` 폴더를 생성시켜놓는다.
   
    🎇500에러가 나면 이것일 확률이 높음 상당히 높음🎇
    

### 5. 앱 속 CRUD작성

- urls → views → template 순서로 작성한다.
1. appname/`urls.py` 작성

```python
from django.urls import path 
from . import views #views의 함수를 사용할 것이므로

app_name = 'articles' #앱의 이름을 써줘야한다.

# 실제 url을 작성한다.
urlpatterns = [      
    path('', views.index, name='index'),
    path('create/', views.create, name='create'), # GET / POST
    path('<int:pk>/', views.detail, name='detail'),
    path('<int:pk>/delete/', views.delete, name='delete'),
    path('<int:pk>/update/', views.update, name='update'), # GET / POST
]
```

1. appname/`views.py` 작성

```python
from django.shortcuts import render, redirect
from django.views.decorators.http import require_safe, require_http_methods, require_POST # 데코레이터를 가져온다.
from .models import Article     # 데이터베이스를 가져온다.
from .forms import ArticleForm  # 데이터베이스폼을 가져온다.

@require_safe           # GET여부 판단.
def index(request):     # request를 무조건 참조해야한다.
    articles = Article.objects.all()  # DB의 전체 데이터를 조회
    context = {
        'articles': articles,
    }
    return render(request, 'articles/index.html', context)

# def new(request):
#     form = ArticleForm()
#     context = {
#         'form': form,
#     }
#     return render(request, 'articles/new.html', context)

@require_http_methods(['GET', 'POST']) # GET or POST여부 판단.
def create(request):
    if request.method == 'POST':
        # create
        form = ArticleForm(request.POST)  # ArticleForm을 사용한다. 
        if form.is_valid():               # 유효성 검사 파트
            article = form.save()         # 유효성이 통과되면 저장한다.
            return redirect('articles:detail', article.pk)
    else:
        # new
        form = ArticleForm()
		# new와 유효성검사 실패시 여기로 온다.
    context = { 
        'form': form, # 실패시 오류메세지도 저장되어 있다.
    }
    return render(request, 'articles/create.html', context)

@require_safe
def detail(request, pk):
    article = Article.objects.get(pk=pk) # variable routing으로 받은 pk 값으로 데이터를 조회
    context = {
        'article': article,
    }
    return render(request, 'articles/detail.html', context)

@require_POST
def delete(request, pk):
    article = Article.objects.get(pk=pk)
    article.delete()
    return redirect('articles:index')

# def edit(request, pk):
#     article = Article.objects.get(pk=pk)
#     form = ArticleForm(instance=article)
#     context = {
#         'article': article,
#         'form': form,
#     }
#     return render(request, 'articles/edit.html', context)

@require_http_methods(['GET', 'POST'])
def update(request, pk):
    article = Article.objects.get(pk=pk)
    if request.method == 'POST':
        form = ArticleForm(request.POST, instance=article)
        # form = ArticleForm(data=request.POST, instance=article)
        if form.is_valid():
            form.save()
            return redirect('articles:detail', article.pk)
    else:
        form = ArticleForm(instance=article)
    context = {
        'article': article,
        'form': form,
    }
    return render(request, 'articles/update.html', context)
```

1. appname/templates/`appname` 폴더를 생성시켜놓는다.
   
    🎇500에러가 나면 이것일 확률이 높음 상당히 높음🎇
    
2. appname/templates/`appname`/`index.html` 작성

```html
{% extends 'base.html' %}

{% block content %}
  <h1>Articles</h1>
  <a href="{% url 'articles:create' %}">CREATE</a>
  <hr>
  {% for article in articles %}
    <p>글 번호 : {{ article.pk }}</p>
    <p>제목 : {{ article.title }}</p>
    <p>내용 : {{ article.content }}</p>
    <a href="{% url 'articles:detail' article.pk %}">상세 페이지</a>
    <hr>
  {% endfor %}
{% endblock content %}
```

1. appname/templates/`appname`/`create.html` 작성

```html
{% extends 'base.html' %}
{% load bootstrap5 %}

{% block content %}
  <h1>CREATE</h1>
  <form action="{% url 'articles:create' %}" method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit">
  </form>
  <hr>
  <a href="{% url 'articles:index' %}">뒤로가기</a>

  <hr>

  <h2>수동으로 Form 작성</h2>
  <form action="#">
    <div>
      {{ form.title.errors }}
      {{ form.title.label_tag }}
      {{ form.title }}
    </div>
    <div>
      {{ form.content.errors }}
      {{ form.content.label_tag }}
      {{ form.content }}
    </div>
  </form>

  <hr>

  <h2>Looping over the form’s fields</h2>
  <form action="#">
    {% for field in form %}
      {{ field.errors }}
      {{ field.label_tag }}
      {{ field }}
    {% endfor %}
  </form>

  <hr>

  <h2>bootstrap v5 라이브러리 사용하기</h2>
  <form action="#">
    {% bootstrap_form form %}
    {% buttons %}
      <button type="submit" class="btn btn-primary">Submit</button>
    {% endbuttons %}
  </form>
{% endblock content %}
```

1. appname/templates/`appname`/`detail.html` 작성

```html
{% extends 'base.html' %}

{% block content %}
  <h1>DETAIL</h1>
  <h2>{{ article.pk }}번째 글입니다.</h2>
  <hr>
  <p>제목 : {{ article.title }}</p>
  <p>내용 : {{ article.content }}</p>
  <p>작성 시각 : {{ article.created_at }}</p>
  <p>수정 시각 : {{ article.updated_at }}</p>
  <a href="{% url 'articles:update' article.pk %}">UPDATE</a>
  <form action="{% url 'articles:delete' article.pk %}" method="POST">
    {% csrf_token %}
    <input type="submit" value="DELETE">
  </form>
  <hr>
  <a href="{% url 'articles:index' %}">뒤로가기</a>
{% endblock content %}
```

1. appname/templates/`appname`/`update.html` 작성

```html
{% extends 'base.html' %}

{% block content %}
  <h1>UPDATE</h1>
  <form action="{% url 'articles:update' article.pk %}" method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    {% comment %} <label for="title">Title: </label>
    <input type="text" name="title" id="title" value="{{ article.title }}"><br>
    <label for="content">Content: </label>
    <textarea name="content" id="content">{{ article.content }}</textarea> {% endcomment %}
    <input type="submit">
  </form>
  <hr>
  <a href="{% url 'articles:detail' article.pk %}">뒤로가기</a>
{% endblock content %}
```

### 6. 유효성 검증

- modelForm을 사용할 건지, form을 사용할 건지 구분됨.
- 용도에 따라서 두가지중 하나를 사용하면 됨.
1. appname/`forms.py`예시 (form)

```python
from django import forms
from .models import Article

class ArticleForm(forms.Form):
    NATION_A = 'kr'
    NATION_B = 'ch'
    NATION_C = 'jp'
    NATIONS_CHOICES = [
        (NATION_A, '한국'),
        (NATION_B, '중국'),
        (NATION_C, '일본'),
    ]

    title = forms.CharField(max_length=10)
    content = forms.CharField(widget=forms.Textarea)
    nation = forms.ChoiceField(choices=NATIONS_CHOICES)
  # nation = forms.ChoiceField(choices=NATIONS_CHOICES, widget=forms.RadioSelect)
```

1. appname/`forms.py`예시 (modelform)

```python
from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):
    title = forms.CharField(
        label='제목',
        widget=forms.TextInput(  # widget은 유효성검사와 관계가 없다. 
            attrs={
                'class': 'my-title form-control', # 속성 : 값
                'placeholder': 'Enter the title', # 을 넣어줄 수 있음
                'maxlength': 10,
            }
        )
    )

    content = forms.CharField(
        label='내용',
        widget=forms.Textarea(
            attrs={
                'class': 'my-content form-control',
                'placeholder': 'Enter the content',
                'rows': 5,
                'cols': 50,
            }
        ),
        error_messages={
            'required': '내용 입력하라고..',
        }
    )

    class Meta:               # 이 구조는 변하지 않는다.
        model = Article       # model과 fiels의 이름이 바뀌어선 안된다.
        fields = '__all__'
        # exclude = ('title',) # 포함하지 않을 필드 설정
```

```python
#기본코드
from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):

    class Meta:               # 이 구조는 변하지 않는다.
        model = Article       # model과 fiels의 이름이 바뀌어선 안된다.
        fields = '__all__'
        # exclude = ('title',) # 포함하지 않을 필드 설정
```

### 에러종류

1.  `405 Method Not Allowed` : 허용되지 않은 메서드

200 // [ OK ] 서버의 Request가 유효하고 성공한 경우
301 // [ Moved Permanently ] 서버에서 리다이렉트(redirect) 페이지 이동 발생
401 // [ Unauthorized ] 유효한 인증 정보를 가지지 않는 경우
403 // [ Forbidden ] 인증이 실패한 경우
405 // [ Methods Not Allowed ] 서버에 요청한 Methods가 유효하지 않는 경우
503 // [ Service Unavailable]  서버가 요청을 받을 준비가 되지 않은 경우

### [추가] 부트스트랩 app 추가하기

```bash
pip install django-bootstrap-v5

#settings.py 앱이름 등록하기
INSTALLED_APPS = [
    "bootstrap5",
		 ...
		 ]
```

```html
#templates
{% extends 'base.html' %}
{% **load bootstrap5** %}

{% block content %}
<h2>bootstrap v5 라이브러리 사용하기</h2>
  <form action="#">
    **{% bootstrap_form form %}**
    {% buttons %}
      <button type="submit" class="btn btn-primary">Submit</button>
    {% endbuttons %}
  </form>
{% endblock content %}
```



# Authentication(인증)과 Authoriztion(권한)

### 1. 기본 세팅

1. 앱생성

```html
python manage.py startapp accounts
```

1. `accounts/urls.py` 와 `crud/urls.py` 수정

```python
#crud/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
]

#accounts/urls.py
from django.urls import path 
from articles import views 

app_name = 'accounts'

urlpatterns = [      
    path('', views.index, name='index'),
]

```

### 2. Custom User Model로 대체하기

- built-in User model의 기본 인증 요구사항이 개발자가 작성하는 프로젝트에 적절하지 않을 수 있음.
- 그래서 User Model을 결정하는 `AUTH_USER_MODEL`설정 값으로 Default User Model을 override(재정의)함
1. `settings.py`

```python
# settings.py
#AUTH_USER_MODEL = 'auth.User'
AUTH_USER_MODEL = 'accounts.User' # 커스텀 User 모델로 지정
```

1. accounts/ `models.py`

```python
# accounts/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass
```

1. accounts/ `admin.py`

```python
# accounts/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

admin.site.register(User, UserAdmin)
```

### 3. accounts/ `urls.py` 작성

```python
from django.urls import path 
from articles import views #views의 함수를 사용할 것이므로

app_name = 'accounts' #앱의 이름을 써줘야한다.
urlpatterns = [      
    path('', views.index, name='index'),
    path('create/', views.create, name='create'), # GET / POST
    path('<int:pk>/', views.detail, name='detail'),
    path('<int:pk>/delete/', views.delete, name='delete'),
    path('<int:pk>/update/', views.update, name='update'), # GET / POST
]
```

### 4. accounts/ `forms.py` 작성

```python
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

class CustomUserCreationForm(UserCreationForm): # 

    class Meta(UserCreationForm.Meta):
        model = get_user_model()
        fields = UserCreationForm.Meta.fields + ('email',)

class CustomUserChangeForm(UserChangeForm):

    class Meta(UserChangeForm.Meta):
        model = get_user_model()
        fields = ('email', 'first_name', 'last_name',)
```

### 4. accounts/ `views.py` 작성

```python
from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST, require_http_methods
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
from .forms import CustomUserCreationForm, CustomUserChangeForm

@require_http_methods(['GET', 'POST'])
def login(request):
    if request.user.is_authenticated:     # 로그인됐을 경우
        return redirect('articles:index') # 홈페이지로

    if request.method == 'POST':  # 포스트 형식으로 들어오면
        form = AuthenticationForm(request, request.POST)
        # form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            # 로그인
            auth_login(request, form.get_user()) # 실제 로그인
            return redirect(request.GET.get('next') or 'articles:index') #
    else:
        form = AuthenticationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/login.html', context)

@require_POST
def logout(request):
    if request.user.is_authenticated:
        auth_logout(request)
    return redirect('articles:index')

@require_http_methods(['GET', 'POST'])
def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # 회원가입 후 로그인
            auth_login(request, user)
            return redirect('articles:index')
    else:
        form = CustomUserCreationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/signup.html', context)

@require_POST
def delete(request):
    if request.user.is_authenticated:
        request.user.delete()
        auth_logout(request)
    return redirect('articles:index')

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

@login_required
@require_http_methods(['GET', 'POST'])
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        # form = PasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            return redirect('articles:index')
    else:
        form = PasswordChangeForm(request.user)
    context = {
        'form': form,
    }
    return render(request, 'accounts/change_password.html', context)
```