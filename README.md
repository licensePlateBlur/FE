# AI 영상편집을 통한 실시간 개인정보 보호 시스템 FE

## ✅ 실행방법

```
git clone https://github.com/licensePlateBlur/FE.git
cd FE
$ npm install
$ npm start
```

## ✅ 배포 AWS S3

### 배포링크 http://groot-capstonedesign-project.s3-website.ap-northeast-2.amazonaws.com

## ✅ CI/CD 자동화

- GitHub Action 사용
- AWS Sync 를 통해 action 과 AWS S3 연결

## ✅ 개발 규칙

- Prettier
- Eslint
- Husky

### 현재 규칙

- Prettier
  ```
  module.exports = {
  printWidth: 100, // printWidth default 80 => 100 으로 변경
  singleQuote: true, // "" => ''
  arrowParens: 'avoid', // arrow function parameter가 하나일 경우 괄호 생략
   };
  ```
- Eslint
  ```
  {
  "extends": ["react-app", "eslint:recommended", "prettier"],
  "rules": {
    "no-var": "error", // var 금지
    "no-multiple-empty-lines": "error", // 여러 줄 공백 금지
    "eqeqeq": "error", // 일치 연산자 사용 필수
    "dot-notation": "error", // 가능하다면 dot notation 사용
    "no-unused-vars": "error" // 사용하지 않는 변수 금지
  }
  }
  ```

### 추가하고싶은 규칙

- commit message를 자주 실수하는데, 메세지를 실수했을때 커밋이 안되도록 정하면 좀더 깔끔한 협업을 할 수 있을것 같다

## ✅ 사용기술

- React TypeScript
- Styled Compoents
- axios
- react-router-dom
- reduxjs/toolkit / react-redux
- Context API
- Canvas
- react-image-file-resizer

## ✅ 프로젝트 구조

```
📦 src
├── 📂 apis
│── 📂 component
│── 📂 context
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
```

## ✅ 에러사항

- 편집된(포토샵 등으로 가공된) 사진에 대한 크기조절 과정에서 이미지가 깨진다
  - 2,3번 사진을 넣으면 가끔 될때가 있다.
- network error 예외처리를 진행하지 않음
- Grid 버전을 추가할 수 있으나 서버 병렬처리가 안되어 에러가 남
