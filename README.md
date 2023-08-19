# AI 영상편집을 통한 실시간 개인정보 보호 시스템 FE

## ✅ 실행방법
```
git clone https://github.com/licensePlateBlur/FE.git
cd FE
$ npm install
$ npm start
```
## ✅ 배포

### 배포링크 아직입니다

### AWS S3 : 빌드

- aws cli 사용
- `npm run deploy` 를 통해 빌드후 s3 버켓 자동 수정

### CI/CI 자동화

- GitHub Action 사용
- `npm run test` 과 `npm run deploy` 를 push할때 자동으로 실행되도록 설정
- 현재 테스트 코드는 진행하지않아 yml파일에서 제외

## ✅ 환경

- Prettier
- Eslint
- Husky

### commit && push 규칙 & 자동화 이유

여러명과 협업을 하기위해서는 규칙이 중요하다. 특히 코드스타일이 다르기때문에 prettier를 통해 formaating을 정했고 eslint로 컴파일 규칙(문법이나 console.log 가 있으면 안되는것 같은것)을 정하여 원활한 협업을 진행했습니다.

### 현재규칙

- commit 실행시 prettier 자동화 / --write --cache를 사용하여 바로 수정후 캐쉬로 저장 // 캐쉬사용 이유는 재사용성으로인해 코드수정 시간 최적화
- push 실행시 eslint 실행 -> eslint에 걸리면 push가 안된다.

### 추가하고싶은 규칙

- commit message를 자주 실수하는데, 메세지를 실수했을때 커밋이 안되도록 정하면 좀더 깔끔한 협업을 할 수 있을것 같다


## ✅ 사용기술
- React typeScript
- Styled Compoents
- axios
- react-router-dom
- reduxjs/toolkit / react-redux
- Canvas

## ✅ 프로젝트 구조
```
📦 src
├── 📂 apis
│── 📂 component
│── 📂 hook
│── 📂 interface
│── 📂 pages
│    │── 📂 Gallery
│    │    │ ── 📂 hook
│    │── 📂 Photo
│    │    │ ── 📂 hook
│    │── 📂 Realtime
│    │    │ ── 📂 hook
│    └── 📂 Video
│    │    │ ── 📂 hook
│    └── 📄 Main.tsx
│── 📂 rotuer
│── 📂 store
└── 📂 svg
