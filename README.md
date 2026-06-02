# blog_template · Blog Design System

카페24/워드프레스형 호스트에 삽입하는 **블로그 본문 조각(완성본)** 의 디자인 시스템 + 템플릿.

🌐 **디자인 시스템 사이트**: https://dohoon0505.github.io/blog_template/
▶ **라이브 예시 글**: https://dohoon0505.github.io/blog_template/preview.html

## 동작 모델
표준 HTML 페이지는 **호스트(테마)** 쪽에 있고, 우리가 만드는 완성본은 그 안에 들어가는 **본문 조각**이다.
호스트가 `blog.js`를 **전역으로 1회 로드**하므로, 완성본 자체는 `<script>`를 호출하지 않아도 목차 여닫기가 작동한다.
CSS만 조각 안에서 `@import`로 직접 로드한다.

```
[호스트 표준 HTML 페이지]  ← style.css(@import) + blog.js(전역) 1회 배포
        └─ 본문 영역에 완성본 조각 삽입 (글마다 교체)
```

## 디자인 시스템
- **테마**: Figma `Blog_example` 기반 그린 테마. 액센트 `#109038`(스크린샷에서 직접 샘플링).
- **토큰**: 색·타이포·간격을 `style.css`의 `:root` CSS 변수로 단일 관리.
- **컴포넌트**: 포스트 헤더(히어로·날짜·리드), 목차, 섹션(기본/`.sec--bar` 강조), 하이라이트(`.hl`), 이미지 그리드, 이미지 슬라이드, 체크리스트, 상품 카드.
- 모든 토큰·컴포넌트의 라이브 데모와 코드 스니펫은 `index.html`(디자인 시스템 사이트)에서 확인.

## 파일
| 파일 | 역할 | 배포 |
|---|---|---|
| `index.html` | **디자인 시스템 사이트**(토큰·컴포넌트·작성법) | Pages 랜딩 |
| `style.css` | 디자인 토큰(`:root`) + 컴포넌트 스타일 | 호스트에 1회 |
| `blog.js` | 공용 전역 스크립트(목차 토글) | 호스트에 1회, 전역 로드 |
| `template.html` | 새 글용 빈 골격(복사해서 사용) | — |
| `example.html` | 예시 완성본(그린 테마 적용) | 본문 조각으로 붙여넣기 |
| `preview.html` | 예시 글 라이브 미리보기(호스트 흉내) | ❌ 배포 안 함 |
| `CLAUDE.md` | 생성 규격(100% 준수 규칙) | — |

## 새 글 만들기
1. `template.html`을 복사 → `{{…}}` 자리를 내용으로 교체.
2. 목차 항목 수 = 섹션 수, `href="#secN"` ↔ `id="secN"` 일치 확인.
3. 필요 컴포넌트(`.sec--bar`, `.checklist`, `.img-grid`, `.hl` 등)는 [디자인 시스템 사이트](https://dohoon0505.github.io/blog_template/)의 코드 스니펫을 참고.
4. `</main>`까지가 완성본. 이 조각을 호스트 본문에 붙여넣는다. 자세한 규칙은 [CLAUDE.md](CLAUDE.md).

## 로컬 미리보기
`file://`에서는 `fetch`가 막히므로 정적 서버로 연다.

```bash
node .serve.js          # 루트에서 실행 (8731 포트)
# 디자인 시스템:  http://localhost:8731/
# 예시 글:        http://localhost:8731/preview.html
#                 http://localhost:8731/preview.html?post=내파일.html
```
