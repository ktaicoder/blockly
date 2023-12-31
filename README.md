# Blockly 커스터마이징

[Blockly](https://github.com/google/blockly)

## 설치 방법

```bash
yarn add @ktaicoder/blockly
```

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
- 자체 버전을 관리합니다. 자체 버전은 구글의 블록리 버전의 끝에 p1, p2 이런식의 Suffix를 붙이는 방식입니다.

```bash
# modify version
vi package.json

# build and packaging
# python3 required for blockly build
yarn dist

git tag v10.3.0-p1
git push origin v10.3.0-p1
```
