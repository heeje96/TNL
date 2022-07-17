# Algorithm 단축법

- 리스트를 더할 때
  ``` python
  # 기존
  a = [1, 2, 3, 4, ....]
  sum = 0
  for i in a:
      sum += int(i)
      
  # 10ms 단축
  a = [1, 2, 3, 4, ....]
  suma = sum(map(int,a))
  ```

  

- 리스트를 print 할 때

  ```python``````
  #기존
  for i in a:
  	print(i, end="")
      
  # 40ms 단축
  print(''.join(a))
  ```

  

