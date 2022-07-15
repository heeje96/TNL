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