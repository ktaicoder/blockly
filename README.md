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

- 2025.05.21: npm에 배포하려고 했을 때 아래의 오류가 발생합니다.

>You must specify a tag using --tag when publishing a prerelease version.

이것은, 현재 package.json의 version이 프리릴리즈(pre-release) 형식이기 때문에, npm publish 시에 --tag를 명시해야 한다는 뜻입니다.

프리릴리즈란? 버전이 이런 형태일 경우를 말합니다:

- 1.0.0-alpha
- 2.0.0-beta.1
- 3.2.1-rc

이런 버전은 안정된(stable) 릴리즈가 아니기 때문에, npm은 기본적으로 latest 태그에 올리는 것을 막고 있다고 합니다.

그래서 아래와 같이 배포하였습니다. (`--tag` 추가)

```sh
npm publish . --access=public --tag=next
```

이렇게 배포한 경우, npmjs에는 최신 버전이 조회되지 않는 문제가 있습니다만, 현재는 어쩔 수 없을 것 같습니다. 아래와 같이 설치할 수 있습니다.

```sh
$  yarn add @ktaicoder/blockly@10.4.3-p5

# 또는
$  yarn add @ktaicoder/blockly@next
```


```bash
# modify version
vi package.json

# build and packaging
# python3 required for blockly build
yarn dist

git tag v10.4.3-p5
git push origin v10.4.3-p5
```
