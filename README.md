# 구글의 블록리 커스터마이징

## 개요

- [구글의 블록리](https://github.com/google/blockly) 를 [AI 코딩블록 사이트](https://aicodiny.com)의 필요에 맞게 커스터마이징 했습니다.

- [AI 코딩블록 사이트](https://aicodiny.com)와 연동되는 S/W들이 같은 버전의 블록리를 사용하기 위해 만들었습니다.
  예를 들면, PC 버전에서도 블록리를 이용하므로, 버전을 일치시킬 필요가 있습니다.

- [구글의 블록리](https://github.com/google/blockly) 라이브러리가 업데이트 될 때 함께 업데이트 해야 합니다.

- 현재 적용한 구글의 블록리 버전은 `10.2.2`입니다.

## 설치 방법

```bash
yarn add @ktaicoder/blockly

# or
yarn add blockly@npm:@ktaicoder/blockly

# or
yarn add blockly@npm:@ktaicoder/blockly@10.2.2-p4

```

## 빌드

- 혹시 윈도우에서 빌드가 안된다면, 리눅스에서 빌드해주세요.

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

git tag v10.2.2-p4
git push origin v10.2.2-p4
```
