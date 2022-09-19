class heap:
    def __init__(self, base=[],key=lambda x:x):
        self.val = [0]  #초기값 설정
        self.last = 0
        self.key = key  #정렬기준이 되는 함수
                        #그냥 쓰면 오름차순(minheap)
                        #-x를 쓰면 (숫자 한정) 내림차순
                        #다른 타입을 쓰고 싶은 경우 함수를 넣으면 됨
                        #ex) 문자열을 저장하는 heap에 대해서 len 사용
        for i in base:  #base를 넣어주면 알아서 heapify한다.
            self.heappush(i)
    def heappush(self,n):
        self.last+=1
        self.val.append(n)
        cnt=self.last
        while cnt>1:#주어진 함수로 숫자가 더 작으면 위로 (앞으로) 감
            if self.key(self.val[cnt])<self.key(self.val[cnt//2]):
                self.val[cnt],self.val[cnt//2]=self.val[cnt//2],self.val[cnt]
                cnt//=2
            else:
                break
    def heappop(self):
        rst=self.val[1]
        self.last-=1
        if self.last==0:
            return rst
        cnt=1
        p=2
        self.val[1]=self.val.pop()
        while True:
            if p+1<=self.last and self.key(self.val[p+1])<self.key(self.val[p]):
                p+=1
            if p<=self.last and self.key(self.val[p])<self.key(self.val[cnt]):
                self.val[cnt],self.val[p]=self.val[p], self.val[cnt]
                cnt=p
                p=cnt*2
            else:
                break
        return rst
    def __str__(self):
        return str(self.val[1:self.last+1])

    def __repr__(self):
        return str(self.val[1:self.last+1])

#0~29를 길이순서대로 저장하는 예시
print('############예시1############')
a=heap(key=len) 
for i in range(30):
    a.heappush(str(i))
print(a)
for i in range(30):
    print(a.heappop())

#0~29를 1의 자리를 기준으로 저장하는 예시
print('############예시2############')
b=heap(key= lambda x:x%10)
for i in range(30):
    b.heappush(i)
print(b)
for i in range(30):
    print(b.heappop())

#base를 사용하는 예시
print('############예시3############')
c=heap(range(11,-1,-1))
for i in range(12):
    print(c.heappop())