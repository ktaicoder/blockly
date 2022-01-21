# 구글의 블록리 커스터마이징

## 개요

- [구글의 블록리](https://github.com/google/blockly) 를 [AI 코딩블록 사이트](https://aicodingblock.kt.co.kr)의 필요에 맞게 커스터마이징 했습니다.

- [AI 코딩블록 사이트](https://aicodingblock.kt.co.kr)와 연동되는 S/W들이 같은 버전의 블록리를 사용하기 위해 만들었습니다. 예를 들면, PC 버전에서도 블록리를 이용하므로, 버전을 일치시킬 필요가 있습니다.

- [구글의 블록리](https://github.com/google/blockly) 라이브러리가 업데이트 될 때 업데이트 해야 합니다.

- 현재 적용한 구글의 블록리 버전은 `7.20211209.2`입니다.

## 설치 방법

```bash
$  yarn add @ktaicoder/blockly
```

## 주요 변경 내용

- FlayoutButton의 style을 변경
  - style로는 변경할 수가 없어서 추가
- JavaScript 제너레이터의 `procedure` 부분을 `async`하게 변경

## 변경 방향

- 구글의 블록리가 변경되면 함께 업데이트합니다.
- 구글의 블록리 소스코드 수정은 최소한으로 변경합니다.
- 왠만한 것은 플러그인으로 처리

### 변경한 파일

- 변경한 파일은 src 폴더에 있습니다.
