# 구글의 블록리 커스터마이징

## 개요

- [구글의 블록리](https://github.com/google/blockly) 를 [AI 코딩블록 사이트](https://aicodingblock.kt.co.kr)의 필요에 맞게 커스터마이징 했습니다.

- [AI 코딩블록 사이트](https://aicodingblock.kt.co.kr)와 연동되는 S/W들이 같은 버전의 블록리를 사용하기 위해 만들었습니다. 예를 들면, PC 버전에서도 블록리를 이용하므로, 버전을 일치시킬 필요가 있습니다.

- [구글의 블록리](https://github.com/google/blockly) 라이브러리가 업데이트 될 때 업데이트 해야 합니다.

## 설치 방법

```bash
$  yarn add @ktaicoder/blockly
```

## 주요 변경 내용

- JavaScript 제네레이터의 `procedure` 부분을 `async`하게 변경
- 그래서 이 라이브러리는 `async/await` 키워드를 지원하는 최신 브라우저만 사용이 가능합니다.
- 코딩팩의 브라우저는 `async/await`을 지원하는 것을 확인했습니다.

## 변경 방향

- 구글의 블록리가 변경되면 함께 업데이트한다.
- 구글의 블록리 소스코드 수정은 최소한으로 변경하는 것이 좋다.
- 왠만한 것은 플러그인으로 처리가 가능하다.

### 변경한 파일

#### 자바스크립트 제네레이터 부분

`blockly-dist/generator/javascript/procedures.js` 파일의 함수 정의에 `async`를 추가하고, ORDER_FUNCTION_CALL을 ORDER_AWAIT으로 변경했다. 함수 호출 부분에는 `await`를 추가했다.
