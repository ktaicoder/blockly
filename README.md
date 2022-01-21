# 구글의 블록리 커스터마이징

## 개요

- [구글의 블록리](https://github.com/google/blockly) 를 [AI 코딩블록 사이트](https://aicodingblock.kt.co.kr)의 필요에 맞게 커스터마이징 했습니다.

- [AI 코딩블록 사이트](https://aicodingblock.kt.co.kr)와 연동되는 S/W들이 같은 버전의 블록리를 사용하기 위해 만들었습니다. 예를 들면, PC 버전에서도 블록리를 이용하므로, 버전을 일치시킬 필요가 있습니다.

- [구글의 블록리](https://github.com/google/blockly) 라이브러리가 업데이트 될 때 함께 업데이트 해야 합니다.

- 현재 적용한 구글의 블록리 버전은 `7.20211209.2`입니다.

## 설치 방법

```bash
yarn add @ktaicoder/blockly

# or
yarn add blockly@npm:@ktaicoder/blockly

# or
yarn add blockly@npm:@ktaicoder/blockly@7.20211209.2-p4

```

## 빌드

- 개인적으로 구글의 블록리 빌드가 윈도우에서는 잘 안되서, 리눅스에서 하고 있습니다. 혹시 윈도우에서 빌드가 안된다면, 리눅스에서 빌드해주세요.
- 구글의 블록리를 빌드하려면 `python3`이 필요합니다.

### Setup

```bash
# preparing
yarn install

git submodule update --init
cd blockly-src
npm install
```

### Build and Publish

- 소스코드를 편집한 후에 빌드합니다.
- 구글의 블록리를 대체할 것이므로, 자체 버전을 관리합니다.
- 자체 버전은 구글의 블록리 버전의 끝에 p1, p2 이런식의 Suffix를 붙이는 방식입니다.

```bash
# modify version
vi package.json

# build and packaging
# python3 required for blockly build
yarn dist

git tag v7.20211209.2-p3
git push origin v7.20211209.2-p3
```

## 주요 변경 내용

- JavaScript 제너레이터의 `procedure` 부분을 `async`하게 변경
- FlayoutButton의 style을 변경
  - css로는 변경할 수가 없어서 추가

## 변경 방향

- 구글의 블록리가 변경되면 함께 업데이트합니다.
- 구글의 블록리 소스코드 수정은 최소한으로 변경합니다.
- 왠만한 것은 플러그인으로 처리

### 변경한 파일

- 변경한 파일은 src 폴더에 있습니다.
