# 블로그 본문 조각(완성본) 생성 규격

이 저장소는 카페24/워드프레스형 호스트에 삽입하는 **블로그 본문 조각**을 생성하기 위한 템플릿이다.
새 글을 만들 때는 아래 규격을 **100% 그대로** 따른다.

## 핵심 모델
- 완성본은 표준 HTML 문서가 아니라 **본문 조각(fragment)** 이다.
- 표준 HTML(`<!DOCTYPE>`/`<html>`/`<head>`/`<body>`)은 **호스트 페이지**에 존재하며, 완성본은 그 안에 삽입된다.
- 호스트가 **`blog.js`를 전역으로 1회 로드**하므로, 완성본 안에는 `<script>`를 넣지 않아도 목차 여닫기가 작동한다.
- CSS만 조각 안에서 직접 로드한다: 첫 줄 `<style type="text/css">@import url("./style.css");</style>`.

## 절대 규칙
1. 출력은 정확히 다음으로 시작한다:
   ```html
   <style type="text/css">@import url("./style.css");</style>
   <main class="page">
   ```
   그리고 `</main>`으로 끝난다. 그 바깥에 어떤 태그도 두지 않는다.
2. **`<script>` 금지.** 인라인 스크립트도 넣지 않는다(호스트 전역 `blog.js`가 담당).
3. `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`, `<title>`, `<meta>` 금지.
4. 클래스명·구조·속성을 임의로 바꾸지 않는다. 아래 골격을 그대로 사용한다.
5. 목차(`.chapter-list`) 항목 수 = `.sec` 섹션 수, 그리고 `href="#secN"` ↔ `id="secN"`가 1:1로 일치해야 한다.

## 구조 골격
```
<main class="page">
  <article>
    <div class="inner"><h2 class="page-title">제목</h2></div>
    <div class="inner">
      <div class="chapter">
        <div class="chapter-head"><h3 class="chapter-title">목차</h3><a class="chapter-toggle">목차 여닫기</a></div>
        <div class="chapter-body"><ul class="chapter-list">
          <li class="chapter-item"><a class="chapter-link" href="#sec1">소제목1</a></li> …
        </ul></div>
      </div>
    </div>
    <section class="sec" id="sec1">
      <div class="inner">
        <img class="sec-quotes-icon fr-fic fr-dii" src="https://dorangflower.cafe24.com/blog/sec_quotes.svg" alt="«">
        <h3 class="sec-title">소제목1</h3>
        <h4 class="sec-subtitle">한 줄 설명</h4>
        <p class="sec-text">본문…</p>
      </div>
      <!-- (선택) 이미지 슬라이드 -->
      <div class="img-slide"><div class="inner">
        <ul class="img-slide-list pc-only">…<li class="img-slide-item"><img src="…" alt="…" class="fr-fic fr-dii"></li>…</ul>
        <ul class="img-slide-list mo-only">…</ul>
      </div></div>
    </section>
    … 섹션 반복 …
    <!-- (선택) 상품 -->
    <aside><div class="product-list">
      <a class="product-item yellow" href="…">
        <div class="product-img"><img src="…" alt="상품 1" class="fr-fic fr-dii"></div>
        <div class="product-info">
          <div class="product-nm">상품명</div>
          <div class="product-price"><del class="origin">정가</del> <span class="total">판매가</span></div>
        </div>
      </a> …
    </div></aside>
  </article>
</main>
```

## 디자인 토큰 (style.css `:root`)
- 색상은 모두 CSS 변수로 관리한다. 임의 hex 대신 토큰을 쓴다.
- 브랜드 액센트: `--accent: #109038` (Figma Blog_example에서 샘플링).
- 먹색 단계 `--ink-900/700/500/400`, 면/선 `--surface #fafafa` · `--line #e5e5e5`.
- 타이포 `--fs-title 30 / --fs-section 24 / --fs-subtitle 21 / --fs-body 18`.
- 간격 스케일 `--space-1…6 = 8/14/20/30/40/60`.

## 컴포넌트 카탈로그 (신규 포함)
- **포스트 헤더**: `.page-title` + `.post-hero`(히어로 이미지) + `.post-meta`(날짜) + `.post-lead`(리드 문단).
- **목차**: `.chapter`(여닫기) — 제목 좌측에 그린 바.
- **섹션**: 기본형(따옴표 아이콘) / 강조형 `.sec--bar`(그린 좌측 바). 둘 다 `.sec-title`·`.sec-subtitle`·`.sec-text` 사용.
- **하이라이트**: 일반 `<strong>`(굵은 먹색), 핵심어 `<strong class="hl">`(그린).
- **이미지 그리드**: `.img-grid > .img-grid-item`(3분할 정적).
- **이미지 슬라이드**: `.img-slide` + `pc-only`/`mo-only`(가로 스크롤).
- **체크리스트**: `.checklist > .check-item`(그린 체크).
- **상품 카드**: `.product-item` 색상 변형 `yellow/red/green/purple`.

> 컴포넌트의 실제 렌더링·코드 스니펫은 디자인 시스템 사이트(`index.html`, GitHub Pages 루트)에서 확인한다.

## 작성 규칙(콘텐츠)
- 본문 단락 강조는 `<strong>…</strong>`, 단락 사이는 `<br><br>` 로 띄운다.
- 모든 `<img>`는 `class="fr-fic fr-dii"`를 유지한다.
- 이미지 슬라이드는 PC용 `pc-only`, 모바일용 `mo-only` 두 `<ul>`을 함께 둔다(CSS가 화면폭으로 전환).
- 상품 색상 클래스: `yellow` / `red` / `green` / `purple`.
- 인용 아이콘·이미지·상품 경로는 `https://dorangflower.cafe24.com/blog/…` 절대경로를 쓴다.

## 검증 방법
1. 정적 서버 실행: `node .serve.js` (저장소 루트).
2. 브라우저에서 `http://localhost:8731/preview.html?post=내파일.html` 접속.
3. 목차의 "여닫기" 아이콘 클릭 → `.chapter-body`가 접힘/펼침 되면 정상.
   (`preview.html`은 호스트를 흉내 내 `blog.js`를 전역 로드한다. 배포하지 않는 개발용.)
