# Gitbash 사용법


![hi](image.PNG)

- `~`는 사용자의 홈 디렉토리

- 디렉토리와 폴더는 99퍼 유사함?

<br>

---

<br>



### 절대 경로
- 루트에서 목적파일까지 모든 경로가 전부 포함된 것

### 상대 경로
- 현재 기준으로 상대적 위치
- `../` : 이전경로
- `./` : 현재경로


## 터미널 명령어

`touch a.txt` *a.txt 파일을 생성*

`start .` 현재 디렉토리를 엶

`mkdir folder_a` make directory

`ls` list 디렉토리 목록 출력
- `-l` : long style

`pwd` print working directory

`cd ..` change directory

`mv` 같은 폴더 간 이동은 rename이다. 다른 폴더 간으론 진짜 옮겨간다.
- `mv s.txt ../test`
  
`rm q.txt` remove

# Git 기본기

Working directory : 작업 중인 목록

- `git add NY_project.txt`
  
Staging area : 커밋 전 준비단계

- `git add NY_project.txt`

Repository : commit을 하면 이동하는 곳



>얼기설기한걸 `add`를 통해 스테깅에어리어에 보낸다.
근데 또 변경하고 싶다. 변경하면 WD로 이동한다.
이제 제대로 한 것 같아서, add 후 Repository로 이동하면 이제 버전관리를 할 수 있다.

---

##실전

`git init` : 깃 폴더를 생성

`git config --global user.name heeje96` : 사용자이름

`git config --global user.email heeje1996@gmail.com` : 사용자이메일

`git config --global --list` : 등록된 리스트 보기

`git status` : 깃의 상태를 본다.

`git add ny_project.txt` : staging area로 넘긴다.

`git rm --cached <file>` : staging area에서 제거한다.

`git commit -m "1st commit"` : repository에 등록
- `-m` : 메세지

`git log` : 이력보기
- `--oneline` : 짧게 보여준다

---
###git hub

`git remote add origin http://github.com/heeje96/test.git` : git을 받아서 다리를 놔주는 것 `remote add` 


`git push` : 버전 올리기
- `-u` origin master




---