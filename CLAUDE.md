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
