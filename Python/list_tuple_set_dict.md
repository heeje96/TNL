

## 리스트 튜플의 차이

|                 | List                          | Tuple                                     |
| --------------- | ----------------------------- | ----------------------------------------- |
| Type            | mutable. unhashable, 중첩가능 | immutable. hashable, 중첩불가             |
| Iteration       | 가능하지만 시간이 더 소요된다 | 가능하고 더 빠르다                        |
| Appropriate for | 삽입 및 삭제 작업에 유용하다  | 요소 접근과 같은 읽기전용 작업에 유용하다 |
| Memory          | 더 많은 메모리 소모           | 메모리 덜 소모                            |
| Methods         | 많은 내장 메서드 제공         | 더 적은 내장 메서드                       |
| Error prone     | 에러 발생하기 쉽다            | 더 안전하다                               |

출처: [개팔자 블로그](https://velog.io/@palza4dev/TIL.-20-%ED%8C%8C%EC%9D%B4%EC%8D%AC-List-vs-Tuple-Dictionary-vs-Set-%EB%B9%84%EA%B5%90-%EB%B0%8F-%EB%A9%94%EC%84%9C%EB%93%9C-%EC%A0%95%EB%A6%AC)



## ✨list tuple set dict 총정리

|               | list                         | tuple             | set               | dict                            |
| ------------- | ---------------------------- | ----------------- | ----------------- | ------------------------------- |
|               | 가변                         | 불변              | 가변              | 가변                            |
| 선언          | l = []                       | t = (seq)         | s = {seq}         | d = {}                          |
|               | l = list()                   |                   | s = set()         | d = dict()                      |
| 추가          | l.append(1)                  |                   |                   |                                 |
|               | l.insert(2, 'data')          |                   |                   |                                 |
|               |                              |                   | s.add(5)          |                                 |
|               |                              |                   | s.update([6,7,8]) | d.update(d2)                    |
| 삭제          | del l[index]                 |                   |                   |                                 |
|               | l.remove(삭제할값)           |                   | s.remove(8)       |                                 |
|               | l.pop()                      |                   | s.pop()           | d.pop()                         |
|               | l.clear()                    |                   | s.clear()         | d.clear()                       |
| list 병합     | l.extend(new_list)           |                   |                   |                                 |
|               | l+= new_list                 |                   |                   |                                 |
| 복사값 대입   | l.copy() / list(l) / list(l) |                   |                   | d.copy()                        |
| 찾기          | l.index('data')              | t.index(2)        |                   |                                 |
|               | 'data' in l                  |                   |                   |                                 |
|               | l.count('data')              |                   |                   |                                 |
| 문자열 생성   | ", ".join(l)                 |                   |                   | str(d)                          |
| 정렬          | l.sort()                     |                   |                   |                                 |
|               | sorted(l)                    |                   |                   |                                 |
| 개수          | len(l)                       | len.(t)           |                   | len(d)                          |
|               | l.count                      | t.count           |                   |                                 |
| 최대값/최소값 | max(l) / min(l)              | max.(t) / min.(t) |                   |                                 |
| 기타          |                              |                   | \| & - ^ //집합   | d.keys()                        |
|               |                              |                   |                   | d.values()                      |
|               |                              |                   |                   | d.items()                       |
|               |                              |                   |                   | d.fromkeys()                    |
|               |                              |                   |                   | d.get(key, default=None)        |
|               |                              |                   |                   | d.setdefault(key, default-None) |

