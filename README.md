# AI 영상편집을 통한 실시간 개인정보 보호 시스템 FE

## ✅프로젝트 목적

유튜브와 인스타그램 등 1인 미디어 시장이 크게 성장하고 있습니다. 1인 미디어콘텐츠가
급증하면서 필연적으로 발생하는 문제점이 개인정보 침해입니다. 크리에이터의 라이브
촬영 영상에서 일반인의 얼굴이 모자이크 없이 그대로 드러나는 사례를 쉽게 찾아볼
수 있습니다. 영상과 같은 콘텐츠에 타인의 동의 없이 얼굴이나 개인정보가 노출은
헌법 제10조에 의하여 초상권이나 사생활의 비밀과 자유를 부당하게 침해하는
불법행위입니다. SW기술을 통해 개인정보 침해 문제와 기존 기술의 불편함을 해결하고자 아이템을 선정 하였습니다.

## ✅ 실행영상

### 사진

![ezgif com-video-to-gif (3)](https://github.com/licensePlateBlur/FE/assets/42410000/d3c226ca-29e3-4c27-a96c-48d2e4a68e62)

### 영상

![ezgif com-video-to-gif (4)](https://github.com/licensePlateBlur/FE/assets/42410000/4d4025b8-0624-40ee-aba0-6a2d90359e93)

## ✅ 실행방법

```
git clone https://github.com/licensePlateBlur/FE.git
cd FE
$ npm install
$ npm start
```

## ✅ 배포 AWS S3

### 배포링크 https://grt.r-e.kr/

※ PC 서버를 사용하기때문에 서버가 꺼져있을수도 있습니다

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
- react-toastify

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

## ✅ 성능 개선

- React Profiler tool 사용
- memoization을 통해 좌표값, 클래스에 대한 동일성 보장, 0.4ms -> 0.1ms 랜더링 최적화

## ✅ 에러사항

- 편집된(포토샵 등으로 가공된) 사진에 대한 크기조절 과정에서 이미지가 깨진다
  - 2,3번 사진을 넣으면 가끔 될때가 있다.
- network error 예외처리를 진행하지 않음
- Grid 버전을 추가할 수 있으나 서버 병렬처리가 안되어 에러가 남
- Canvas를 관심사분리를 하려했으나 context 는 상태를 관리하기보단 useeffect에서 랜더링되는게 좋은데, props로 전달할때 기능이 정상적으로 작동하지 않아 분리하지않음 또한 canvas 이미지를 저장할때 canavs 태그에서 가져와야해서 관심사가 분리되지 않는다고 판단했음
