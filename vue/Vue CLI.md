# Vue CLI

날짜: 2022년 11월 2일 오전 9:47
속성: Vue

# Node.js

### Node.js

- 브라우저를 조작하는 유일한 언어
- 브라우저 밖에서는 구동할 수 없었다.
- 여러 OS, 서버에서도 사용할 수 있게 바뀌었다.
- python에 pip가 있으면 node.js에는 npm (의존성 패키지를 관리)

# Vue CLI

Vue개발을 위한 표준 도구

프로젝트의 구성을 도와주는 역할

확장 플러그인

```jsx
//설치
$npm install -g @vue/cli

//프로젝트 생성
//vscode terminal에서 진행 // vue-cli = 프로젝트 이름
$vue create vue-cli 
  // default vue2를 선택

//이동 후 
$cd vue-cli
//서버 구동
$npm run serve
```

 

## 구성

![Untitled](Vue%20CLI/Untitled.png)

- 자동으로 깃이 생성된다. `.git`을 지워야 업로드 된다..
- node_modules : js환경 의존성 모듈
    - webpack: static module bundler
    - 모듈간의 의존성 문제를 해결하기 위한 도구
    - 프로젝트에 필요한 모든 모듈을 매핑, 내부적으로 종속성 그래프 빌드
    
    ### Module 모듈
    
    - 개발하는 어플리케이션의 크기가 커지고 복잡해지면 파일하나에 모든  기능을 담기가 어려워짐
    - 자연스럽게 파일을 분리, 관리를 했고 대개 기능단위로 구분하며, 클래스 하나 혹은 복수의 함수로 구성된 라이브러리 하나로 구성됨
    - 의존성 문제
        - 서로간에 의존성이 깊어지면서, 어떤 모듈간의 문제인지 파악하기 어려움
    
    ### Bundler
    
    - 모듈 의존성 문제를 해결해주는 작업이 Bundling
    - 도구가 Bundler이고, Webpack은 번들러중 하나
    - 모듈들을 하나로 묶어주고, 묶인 파일은 하나로 만들어짐
    - Bundling된 결과물은 개별 모듈의 실행 순서에 영향을 받지 않고 동작
- babel.config.js : js컴파일러 (과거로 통일해서 컴파일)
- package.json : 프로젝트 종속성 목록, 지원되는 브라우저 구성 옵션
- package-lock.json : `requirements.txt` 와 같은 역할을 한다.

### `public/`

- `public/index.html`
    - Vue 앱의 뼈대가 되는 html파일
    - Vue앱과 연결될 요소가 있음

### `src/`

- asssets/
- components/
    - 하위 컴포넌트들이 위치
- App.vue
    - 최상위 컴포넌트
    - public/index.html과 연결됨
- main.js
    - 프로젝트 빌드를 시작할 때 가장먼저 시작하는 파일

# SFC

### Component

- ui를 기능별로 분화한 조각
- 재활용, 재사용을 위해 개발된 구성요소
- 장점: 유지보수, 재사용성, 확장가능, 캡슐화
- <Root> <Header> <main> <aside> ….전부 컴포넌트
  
    ### in vue
    
    **핵심: Vue instance를 기능 단위로 작성하는 것이 핵심**
    
    - component in Vue = Vue instance
    - new Vue()로 만든 인스턴스
    - .vue파일이 하나의 vue instance이고, 하나의 컴포넌트이다.

### Vue component의 구조

- <template>
- <script>
  
    이제 파일 하나가 instance이다.
    `~~const app = new Vue()~~` 
    
- <style>
- 이 세개가 들어있는 컴포넌트들이 하나의 페이지를 만든다.
- root에 해당하는 최상단의 component가 App.vue
- App.vue 파일하나만을 를 index.html과 연결하여 rendering = SPA

### 코드

### 불러오기

`import {instance name} from {위치}`

- instance name은 instance생성 시 작성한 name
- `@`는 src의 shortcut
- `.vue` 생략가능
- templates안에는 반드시 하나의 요소만 추가 가능(비어있어도 X)

```jsx
<template>
  <div>
    
  </div>
</template>

<script>
export default {
    name:'MyComponent',
}
</script>

<style>

</style>
```

1. 불러오기
2. 등록하기
3. 보여주기

```jsx
<template>
  <div id="app"> // 앱이 아니여도 됨
		// 보여주기
    <MyComponent/>
  </div>
</template>

<script>
// 1.불러오기
import MyComponent from './components/MyComponent.vue';
export default {
  name: 'App',
  components: {
    // 2. 등록하기
    MyComponent
}
<script>
```

### 규칙

- `The…vue` : 이름을 지으면 어딘가에 하위, 상위로 쓰이지 않는다.
- 컴포넌트간에 강한 연관성이 있다면
  
    `TodoList.vue`
    
    `TodoListItem.vue`
    
    `TodoListItemButton.vue`
    

# Data in components

### 컴포넌트는 데이터를 어떻게 주고받을까?

- 부모-자식 관계만 데이터를 주고받게 하자!
    - 부모→자식
        - pass props 방식
    - 자식→부모
        - emit event 방식

### pass props

- 부모→자식의 데이터 전달방식을 pass props라고 한다.
- 정적인 데이터를 전달하는 경우 static props라고 명시하기도 한다.
- 요소에 속성을 작성하듯이 사용가능 하며
- 보낼 때
  
    `prop-data-name="value"`의 형태로 데이터를 전달
    
    - 이때 속성의 키 값은 kebab-case를 사용
    - kebab-case로 전달 (HTML속성은 대소문자를 구분하지 않기 때문)
    - kebab-case 키값이 자동으로 camel로 읽힌다.
    - v-bind를 이용하여 **동적으로 바인딩**
    
    ```jsx
    <MyComponentItem :dynamic-props="dynamicProps"/>
    
    ....
    data: function(){
    	return{
    		dynamicProps: "이건 동적인 데이터!",
    	}
    }
    ```
    
- 받을 때
    - 받은 props를 type과 함께 명시
    - camel-case
    
    ```jsx
    export default {
      name: 'HelloWorld',
      props: { //이 부분
        msg: String
      }
    }
    ```
    

### 컴포넌트의 data함수

각 vue 인스턴스는 같은 data 객체를 공유하므로 새로운 data객체를 반환(return)하여 사용해야 함

```jsx
data: function(){
	return{
		count:0,
	}
}
```

### 단방향 데이터 흐름

- 모든 props는 부모에서 자식으로 단방향 바인딩을 형성, 부모가 업데이트되면 자식으로 흐르지만, 반대방향은 안된다.
- 하위 컴포넌트에서 prop을 변경하려고 시도해서는 안되며, 그렇게 하면 Vue는 콘솔에서 경고를 출력함

## Emit Event

- 이벤트를 발생시켜 어떻게 데이터를 전달하는가?
    1. 데이터를 이벤트 리스너의 콜백함수의 인자로 전달
    2. 상위 컴포넌트는 해당 이벤트를 통해 데이터를 받음

### `$emit`

- `$emit` 메서드를 통해 부모 컴포넌트에 이벤트를 발생
    - `$emit(’event-name’)` 형식으로 사용하며 부모 컴포넌트에 event-name이라는 이벤트가 발생했다는 것을 알림
    - 마치 사용자가 마우스 클릭을 하면 click 이벤트가 발생하는 것 처럼
    - `$emit(’event-name’)`이 실행되면 event-name 이벤트가 발생하는 것
- 흐름정리
    1. 자식 컴포넌트에 있는 버튼 이벤트를 청취하여 연결된 핸들러 함수(ChildToParent) 호출
    2. 호출된 함수에서 $emit을 통해 상위컴포넌트에 이벤트(child-to-partent) 발생
        1. 이벤트에 데이터(child data)를 함께 전달
    3. 상위 컴포넌트는 자식 컴포넌트가 발생시킨 이벤트(child-to-parent)를 청취하여 연결된 핸들러 함수(parentGetEvent) 호출 함수의 인자로 전달된 데이터(child data)가 포함되어 있음
    4. 호출된 함수에서 사용가능

```jsx
// 자식컴포넌트
<button @click="childToParent">클릭!</button>

...
export default {
    name:'MyComponent',
    methods:{
        childToParent:function (){
            this.$emit('money-emit', '이건 자식이 보낸 데이터다')
        }
    }
}
```

```jsx
// 부모 컨포넌트
<MyComponent @money-emit="parentGetEvent"/>
...
export default {
  ...
  methods:{
    parentGetEvent: function(childData){
      console.log("돈 없다능")
      console.log(childData)
    }
  }
}
```

### 참고

- javascript는 변수에 _, $ 두개의 특수문자를 사용가능
- 이때, 기존에 사용하던 변수, 메서드들과 겹치지 않게 하기 위해서 vue는 $emit이벤트 전달을 함

### 컨벤션 정리

HTML요소 = kebab-case

JavaScript = camelCase

**props**

상위→하위는 HTML

**emit**

emit이벤트를 발생시키면 HTML요소가 이벤트를 청취:kebab-case

상위 부모가 kebab으로 읽어야하기 때문에, kebab으로 전달