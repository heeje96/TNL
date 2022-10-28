# git

날짜: 2022년 10월 28일 오전 9:15

```jsx
// 깃 폴더 생성
git init

// 현재 상태
git status

// git add
git add .

// git 올라간거 삭제
git rm --cached readme.md

// git commit 메세지 안 썼을 때 // 명령어 -> i -> 메세지 입력
git commit

// git
git restore

// 
git log --oneline
git log --oneline --all 
git log --oneline --graph --all 

// 
//origin : <repo_name>(별명) 
//{remote_repo} : <local_branch>(로컬 브랜치 이름)
git remote add origin {remote_repo} 

git clone {remote_repo}
```

 `(HEAD -> master)` 

- HEAD는 깃발에 가깝다.
- master = 브랜치 이름(main브랜치로 많이 쓰인다)

### Working Directory 작업단계

`git restore`: 이전 커밋상태로 되돌리기

- 해당 내용을 복원할 수 없다.

### Staging Area 작업단계

Working Directory로 되돌리기

`git rm --cached` 

`git restore --staged`

### Repository 작업단계

커밋을 완료한 파일을 Staging Area로 되돌리기

`git commit --amend`

```jsx
// 해당 커밋 이후 ...
 
// --hard: 

```

### `git reset [옵션] {커밋 ID}`

해당하는 커밋으로 이동할 수 있는 명령어

```jsx
// 옵션 soft, mixed, hard
// --soft: staging area로 돌려놓음
// --mixed: working directory로 돌려놓음
// --hard: mixed + working directory가 변경됨(모두 바뀜)
git reset [옵션] {커밋 ID}
```

### `git revert {커밋 ID}`

해당 {커밋 아이디} 지점으로 되돌리기

```jsx
git revert {커밋 ID} : 해당 커밋 ID 지점으로 되돌리기
git revert {커밋 ID1....커밋 ID2} : 커밋 ID 1 다음부터 커밋 ID 2 지점까지 되돌리기
```

git reset과의 차이점

- 개념적 차이
    - reset은 커밋 내역을 삭제하는 반면, revert는 새로운 커밋을 생성함
    - revert는 github를 이용해 협업할 때, 커밋내역의 차이로 인한 충돌 방지 가능
- 문법적 차이
    - git reset 123이라고 작성하면 123이라는 커밋을 되돌린다는 뜻
    - git revery 123이라고 작성하면 커밋 한개를 취소한다는 뜻

## git branch

**조회**

`git branch` : 로컬 저장소의 브랜치 목록 확인 

`git branch -r` : 원격저장소의 브랜치 목록 확인

**생성**

`git branch {브랜치 이름}` : 브랜치 생성

**삭제**

`git branch -d {브랜치 이름}` : 브랜치 삭제

### git switch

`git switch {브랜치 이름}` : 다른 브랜치로 이동

`git switch -c {브랜치 이름}` : 브랜치 생성 및 이동 

`git switch -d {브랜치 이름}` : 브랜치 삭제

### git checkout

`git checkout {브랜치 명}`: 해당 브랜치로 이동

`git checkout -b {브랜치 명}`: 해당 브랜치를 생성 후 이동

`git checkout {커밋 ID}` : 해당 커밋으로 이동(특정 커밋에서 새로운 비랜치를 만들고 싶을 때 사용)

### HEAD

“This is a pointer to the local branch you’re currently on”

HEAD는 현재 브랜치를 가리키고, 각 브랜치는 자신의 최신 커밋을 가리키므로 결국 HEAD가 현재 브랜치의 최신 커밋을 가리킨다고 할 수 있음

# Git merge

### git merge {합칠 브랜치 이름}

`git merge {합칠 브랜치 이름}`

- 분기된 브랜치들을 하나로 합치는 명령어
- 병합하기 전에 브랜치를 합치려고 하는, 즉 메인 브랜치로 switch해야함
- 병합 종류
    - Fast-Forward
    - 3-way Merge
    - Merge Conflict → 사람이 직접함

`git merge --abort` : merge 하다가 conflict가 발생했을 때, merge 작업을 중단하고 이전 상태로 돌아가는 명령어