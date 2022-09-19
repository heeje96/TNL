# Django Form

### 유효성 검증이 반드시 필요하다.

- 데이터 형식이 맞는 지에 대한 검증이 필요
- 악의적인, 비정상적인 요청이 있다.
- 과중한 작업과 반복코드를 줄여준다.

### Django는 Form에 관련된 작업의 세부분을 처리한다.

1. 렌더링을 위한 데이터 준비 및 재구성
2. 데이터에 대한 HTML forms 생성
3. 클라이언트로부터 받은 데이터 수신 및 처리



### Form Class 선언

- Model class를 선언하는 것과 비슷하다.
- Model과 마찬가지로 상속을 통해 선언한다.

- form class 기본 구조

```python
# appname/forms.py
from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = '__all__'
    
# appname/views.py
from .forms import ArticleForm
def new(request):
    form = ArticleForm()
    context = {
        'form': form,
    }
    return render(request, 'articles/new.html', context)

# appname/new.html
{% block content %}
<form action...>
	{{ form.as_p }}        #이런 식으로, input을 대체할 수 있다. as_p = p로 감싸서 렌더링
</form>
{% endblock content %}

```

- forms.py에 작성하는 것은 규약이 아니다. 파일이름이 달라도 되고 어디에나 작성이 가능 하지만, 관행적으로 하는 것이다.

### input 요소 표현법

1. form fields

   - 입력에 대한 유효성 검사 로직을 처리

   - 템플릿에서 직접 사용됨

2. widgets

   - **단순하게 HTML렌더링을 처리하는 것이며, 유효성 검증과 아무런 관계가 없음**

   - 웹페이지의 HTML input 요소 렌더링을 담당

   - input 요소의 단순한 출력 부분을 담당

   - 웹페이지의 HTML input요소 렌더링을 담당
     - input 요소의 단순한 출력부분을 담당

   - widgets은 반드시 form field에 할당 됨

3. 입력 종류

   ```python
   # textbox
   t = forms.CharField(max_length=10)
   
   # Textarea
   tarea = forms.CharField(widget=forms.Textarea())
   
   # dropdown ChoiceField
   NATIONS_CHOICES = [
       (NATION_A, '한국'),
       (NATION_B, '중국'),
       (NATION_C, '일본'),]
   choi = forms.ChoiceField(choices=NATIONS_CHOICES) #튜플리스트를 따로 만들어서 넣어주는 것을 권장
   
   # radioSelect
   nation = forms.ChoiceField(choices=NATIONS_CHOICES, widget=forms.RadioSelect)
   ```

   

   

   ### model form

   - 중복되는 부분이 너무 많다.

   - model form을 사용하면 더 쉽게 작성 가능하다.

   - ```python
     from django import forms
     from .models import Article
     
     class ArticleForm(forms.ModelForm):
         class Meta: # forms.ModelForm에 대한 데이터를 작성한다~
             model = Article # model과 fields의 변수명을 바꾸면 안된다! 
             fields = '__all__'
     ```

   - `class Meta`

     - Meta data = 데이터를 표현하기 위한 데이터
       - ex) 사진파일 : 사진 데이터, 촬영시간 렌즈 ... ...
     - 데이터에 대한 데이터의 클래스
     - model = Article 
       - 아티클을 필요한 시점에 사용하기 위해서, 아티클의 참조값 그대로 가져온다. 

   

   ## ModelForm with view functions

   ```python
   #views.py
   def create(request):
       form = ArticleForm(request.POST)
       
       #저장하기 전에 검증하기
       if form.is_valid(): #유효성 검사
           article = form.save() # 새 글을 작성했다, (반환: 생성된 객체를 리턴한다.)
           return redirect('article:index', article.pk)
       print(f'에러: {form.errors}')
       context = {
           'form':form, }
       return render(request, 'article/new.html', context) #에러를 전달
   ```

   

   ### UPDATE

   - `request.POST`: 사용자가 form을 통해 전송한 데이터(새로운 데이터)
   - `instance`: 수정이 되는 대상 

   ```python
   #def edit
   article = Article.objects.get(pk=pk)
   form = ArticleForm(instance = article)
   context = { 'article':article, 'form':form}
   
   #def update
   article = Article.objects.get(pk=pk)
   form = ArticleForm([data=]request.POST, instance = article) #request.POST이 update와 new와 차이
   if form.is_vaild():
       form.save()
       return redurect('articles:detail', article.pk)
   context = {'form':form}
   ret....
   
   ```



### Form과 ModelForm

- ModelForm이 Form 보다 좋은 것이 아니라 역할이 다른 것
- **Form**
  - 사용자로부터 받는 **데이터가 DB와 연관되어 있지 않는 경우**에 사용
  - DB에 영향을 미치지 않고 **단순 데이터**만 사용되는 경우
  - (예시 - **로그인**, 사용자의 데이터를 받아 인증과정에서만 사용 후 별도로 DB에 저장하지 않음)

- **ModelForm**
  - 사용자로부터 받는 **데이터가 DB와 연관되어 있는 경우**에 사용
  - 데이터의 유효성 검사가 끝나면 맵핑해야될 것을 알고있기 때문에 save()호출이 가능



## Widgets 활용하기

- 위젯은 formField에 종속시켜 작성하는 것을 권장함. (ArticleForm아래에)

- ```python
  from django import forms
  from .models import Article
  
  class ArticleForm(forms.ModelForm):
  	#시작
      title = form.CharField(          #charField로 설정
      	label='제목',                #core field arguments
      	widget=form.TextInput(
          	attrs={                  #속성값을 넣는다.
                  'class': 'my-title', #클래스를 생성시킨다. #부트스트랩
                  'placeholder' : 'Enter the title', #기본안내문구
                  'maxlength' : 10,    #실제 유효성 검사에 영향을 주지 못한다.
              }
          )
      )
      content = forms.CharField(
      	label='내용' 
          widget=forms.Textarea(
              attrs={
                  'rows':5,
                  'cols':50,
              }
          )
          error_message={
              'required':'lease enter your content',
          }
      )
      class Meta:
          model = Article
          fields = '__all__'
  ```

  - 단점: 구조를 획일화시켰다.
  - 장점: 많은 기능을 얻었다.

  

## Handling HTTP requests

### 개요

- **'HTTP requests 처리에 따른 view 함수 구조 변화'**
- new-create, edit-update의 view함수 역할을 잘 살펴보면 하나의 공통점과 하나의 차이점이 있음
- **공통점**
  - create, update로직을 구현하기 위한 공통목적
- **차이점**
  - new와 edit은 GET요청에 대한 처리만 한다.->페이지 렌더링
  - create update는 POST요청에 대한 처리만을 진행 -> DB조작(생성 수정)
- 이런 공통점과 차이점을 **하나의 뷰 함수에서 메소드에 따라 분기처리 하도록 변경**



```python
if request.method == 'POST': #create 코드
    ->
else: #new 코드
    ->
    
```





## view decorators

- 데코레이터 (Decorator) : 해당 함수를 수정하지 않고 기능을 추가해주는 함수

```python
# View함수가 특정한 요청 method만 허용하도록 하는 데코레이터
from django.views.decorators.http import require_http_methods
@require_http_methods(['GET','POST'])

#POST요청 method만 허용하도록 하는 데코레이터
from django.views.decorators.http import require_POST
@require_POST

#권장사항 GET대신 safe가 권장된다.
from django.views.decorators.http import require_safe
@require_safe
```

[기타] 405 Method Not Allowed : 요청방법이 서버에게 전달 되었으나 사용 불가능한 상태



### 정리

- Django Form Class
  - 유효성 검사 도구
  - 공격 및 데이터 손상 방어수단
  - 유효성 검사 편의 제공
  - Form과 ModelForm의 차이점 알아두기
- View 함수 구조 변화



### 추가Rendering fields manually

https://docs.djangoproject.com/en/4.1/topics/forms/#working-with-form-templates

Working with forms



