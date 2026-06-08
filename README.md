# blog_template · Blog Design System (Figma Blog_example 100%)

카페24/워드프레스형 호스트에 삽입하는 **블로그 본문 조각(완성본)** 의 디자인 시스템 + 템플릿.
디자인·레이아웃은 Figma `Blog_example`을 **100% 반영**한 좁은 단일 칼럼 블로그입니다.

🌐 **디자인 시스템 사이트**: https://dohoon0505.github.io/blog_template/
▶ **라이브 예시 글**: https://dohoon0505.github.io/blog_template/preview.html

## 동작 모델
표준 HTML 페이지는 **호스트(테마)** 쪽에 있고, 완성본은 그 안에 들어가는 **본문 조각**이다.
CSS만 조각 안에서 `@import`로 직접 로드한다. 현재 디자인엔 인터랙션이 없어 `<script>`는 쓰지 않는다.

```
[호스트 표준 HTML 페이지]  ← style.css(@import) 1회 배포
        └─ 본문 영역에 완성본 조각 삽입 (글마다 교체)
```

## 디자인 시스템 (Figma 실측 반영)
- **레이아웃**: 좁은 단일 칼럼 `--maxw: 640px`, 좌우 흰 여백.
- **액센트**: `#109038`(Figma 스크린샷에서 직접 샘플링).
- **타이포**: 제목 32/800, 섹션 20/700, 본문 17(행간 1.8), 날짜 13. 토큰은 `style.css` `:root`.
- **컴포넌트**: 포스트 헤더(히어로·리드·날짜), 섹션 헤더 2종(`.sec--bar` 그린 바 / `.sec--quote` 큰 따옴표), 서브타이틀(divider), 하이라이트(`.hl`), 이미지 그리드(3분할), 큰 이미지(`.sec-figure`), 체크리스트.
- 라이브 데모·코드 스니펫은 `index.html`(디자인 시스템 사이트).

## 파일
| 파일 | 역할 | 배포 |
|---|---|---|
| `index.html` | **디자인 시스템 사이트**(토큰·컴포넌트·작성법) | Pages 랜딩 |
| `style.css` | 디자인 토큰(`:root`) + 컴포넌트 스타일 | 호스트에 1회 |
| `template.html` | 새 글용 빈 골격(복사해서 사용) | (작성용) |
| `example.html` | 예시 완성본(Figma B2B 아티클 재현) | 본문 조각으로 붙여넣기 |
| `preview.html` | 예시 글 라이브 미리보기(호스트 흉내) | ❌ 배포 안 함 |
| `blog.js` | (옵션) 호스트 전역 인터랙션 슬롯 | 필요 시 |
| `CLAUDE.md` | 생성 규격(100% 준수 규칙) | (문서용) |

## 새 글 만들기
1. `template.html`을 복사 → `{{…}}` 자리를 내용으로 교체.
2. 섹션 헤더는 `.sec--bar`(그린 바) 또는 `.sec--quote`(큰 따옴표) 중 선택.
3. 이미지는 `<img>`로 교체하거나 비워서 회색 자리표시로 둔다.
4. `</main>`까지가 완성본. 호스트 본문에 붙여넣는다. 자세한 규칙은 [CLAUDE.md](CLAUDE.md).

## 로컬 미리보기
`file://`에서는 `fetch`가 막히므로 정적 서버로 연다.

```bash
node .serve.js          # 루트에서 실행 (8731 포트)
# 디자인 시스템:  http://localhost:8731/
# 예시 글:        http://localhost:8731/preview.html
```
