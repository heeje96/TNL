# Algorithm 실행시간 빠르게 풀기

- 리스트를 더할 때 SUM이 더 빠르다
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

  

- 리스트를 print 할 때 print를 반복하는 것보다, 리스트를 만든 뒤 print해보자

  ```python
  #기존
  for i in a:
  	print(i, end="")
      
  # 40ms 단축
  print(''.join(a))
  
  #------

  #기존
  a = int(input())
  for i in range(a, -1, -1):
    print(i, end = " ")

  # 40ms 단축 
  n = int(input())
  result = ""
  for i in range(n+1):
    result += f"{n-i} "
  print(result)
  
  ```

  
