# Flexible Box Layout

**특징**

- ie 부분지원
- 부모태그가 있고, 안에 자식태그를 넣는다.



**축**

main axis : 메인 축

cross axis : 교차 축

**구성요소**

Flex Contiainer (부모 요소)

- display: flex             /*기본 flex
- display: inline-flex    /*컨텐츠에 맞춘 테두리

Flex item(자식요소)

```html
<div style ='display:flex'>
    <div class = 'box'></div>
    <div class = 'box'></div>    
    <div class = 'box'></div>
</div>
```





## Flex 속성

배치 설정

`flex-direction` : Main axis 기준 방향 설정

- row, row-reverse, column, column-reverse

`flex-wrap`: 아이템이 컨테이너를 벗어나는 경우 영역내에 배치되게 설정

- wrap, nowrap

공간나누기

`justify-content`: Main axis를 기준으로 공간 배분

- flex-start, flex-end, center, space-between, space-around, space-evenly

`align-content`:croass axis를 기준으로 공간 배분
(아이템이 한줄로 배치되는 경우 확인할 수 없음)

- flex-start, flex-end, center, space-between, space-around, space-evenly

정렬

`align-items`: 모든 아이템을 Cross axis 기준으로 정렬

`align-self`: 개별 아이템을 Cross axis기준으로 정렬

