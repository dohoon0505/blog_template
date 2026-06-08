# 블로그 본문 조각(완성본) 생성 규격 — Figma Blog_example 100%

이 저장소는 카페24/워드프레스형 호스트에 삽입하는 **블로그 본문 조각**을 생성하기 위한 템플릿이다.
디자인·레이아웃은 **Figma `Blog_example`을 100% 반영**한다. 새 글은 아래 규격을 그대로 따른다.

## 핵심 모델
- 완성본은 표준 HTML 문서가 아니라 **본문 조각(fragment)** 이다.
- 표준 HTML(`<!DOCTYPE>`/`<html>`/`<head>`/`<body>`)은 **호스트 페이지**에 있고, 완성본은 그 안에 삽입된다.
- CSS만 조각 안에서 직접 로드한다: 첫 줄 `<style type="text/css">@import url("./style.css");</style>`.
- 현재 Figma 디자인에는 목차 토글 같은 인터랙션이 없어 **`<script>`를 쓰지 않는다**(필요 시 호스트 전역 `blog.js` 활용).

## 절대 규칙
1. 출력은 정확히 다음으로 시작한다:
   ```html
   <style type="text/css">@import url("./style.css");</style>
   <main class="page">
   ```
   그리고 `</main>`으로 끝난다. 그 바깥에 어떤 태그도 두지 않는다.
2. `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`, `<script>` 금지.
3. 클래스명·구조를 임의로 바꾸지 않는다. 아래 골격을 그대로 사용한다.
4. **좁은 단일 칼럼**(`--maxw: 640px`) 레이아웃. 넓은 풀폭 레이아웃을 만들지 않는다.

## 디자인 토큰 (style.css `:root`, Figma 실측)
- 액센트: `--accent: #109038` (Figma 스크린샷 샘플링).
- 먹색: `--ink-900 #1a1a1a`(제목) · `--ink-700 #333`(본문) · `--ink-500 #555`(리드) · `--meta #b9bcc0`(날짜).
- 면/선: `--placeholder #e8e8e8`(이미지 자리) · `--line #ececec`.
- 타이포: `--fs-title 32/800 · --fs-section 20/700 · --fs-subtitle 17 · --fs-body 17(행간 1.8) · --fs-meta 13`.
- 간격: `--space-1…6 = 8/14/20/30/44/64`. 섹션 간 64, 블록 간 44.

## 구조 골격
```
<main class="page">
  <article>
    <!-- 포스트 헤더 -->
    <div class="post-hero"><img src="…"></div>      (이미지 없으면 빈 div = 회색 자리)
    <h2 class="page-title">제목</h2>
    <p class="post-lead">리드 한두 문장</p>
    <div class="post-meta">2024.10.20</div>

    <!-- 섹션 ① : 그린 좌측 바 헤더 -->
    <section class="sec sec--bar">
      <h3 class="sec-title">소제목</h3>
      <p class="sec-text">본문 … <strong>강조</strong> … <strong class="hl">핵심어(그린)</strong> … 단락 사이 <br><br></p>
      <div class="img-grid"><div class="img-grid-item">…</div> ×3</div>   (선택)
    </section>

    <!-- 섹션 ② : 큰 따옴표 헤더 -->
    <section class="sec sec--quote">
      <div class="sec-quote-mark">“</div>
      <h3 class="sec-title">소제목, 핵심어는 <span class="hl">그린</span></h3>
      <p class="sec-subtitle">서브타이틀 — 하단 divider</p>
      <div class="sec-figure"><img src="…"></div>                        (선택)
      <p class="sec-text">본문 …</p>
      <div class="checklist"><div class="check-item">항목</div> …</div>   (선택)
    </section>
  </article>
</main>
```

## 컴포넌트 카탈로그
- **포스트 헤더**: `.post-hero`(히어로, 비율 16/13) + `.page-title` + `.post-lead` + `.post-meta`(날짜, 하단 divider).
- **섹션 헤더 2종**: `.sec--bar`(그린 좌측 바) / `.sec--quote`(큰 따옴표 ❝ + `.sec-quote-mark`).
- **서브타이틀**: `.sec-subtitle`(하단 divider) — 큰 따옴표 섹션의 리드 라인.
- **본문/강조**: `.sec-text`, 일반 `<strong>`, 핵심어 `<strong class="hl">`/`<span class="hl">`(그린).
- **이미지**: 3분할 `.img-grid > .img-grid-item`, 단일 와이드 `.sec-figure`.
- **체크리스트**: `.checklist > .check-item`(그린 체크).
- **상품 광고**: 인라인 카드 `.promo`(미디어+정보+CTA) / 하단 배너 `.promo--banner`(그린 배경 강한 CTA). 내부 `.promo-eyebrow`·`.promo-title`·`.promo-desc`·`.promo-price`(`.origin`/`.now`)·`.promo-cta`.

## 상품 광고 배치 규칙
- 글은 독자 질문에서 끝나지 않고, 관심 있을 후속 섹션(`.sec--bar`/`.sec--quote`)을 이어 작성한다.
- **문서 중앙**(본문 섹션 사이)에 인라인 카드 `.promo` 1개, **문서 최하단**에 배너 `.promo--banner` 1개를 둔다.
- 광고는 솔루션 소개가 아니라 **실물 상품**(상품명·가격 `정가/판매가`·구매 CTA·상품 링크)으로 구성한다.
- 본문 맥락과 연결된 상품으로 자연스럽게 구매로 이어지게 쓴다(맥락 없는 노출 금지).

> 모든 컴포넌트의 라이브 렌더링·코드 스니펫은 디자인 시스템 사이트(`index.html`, GitHub Pages 루트)에서 확인한다.

## 작성 규칙(콘텐츠)
- 본문 단락 강조는 `<strong>`, 핵심어/브랜드어는 `.hl`(그린), 단락 사이는 `<br><br>`.
- 이미지는 `<img>`로 교체하거나 비워서 회색 자리표시(Figma 목업과 동일)로 둔다.

## 검증 방법
1. 정적 서버 실행: `node .serve.js` (저장소 루트, 8731).
2. 디자인 시스템: `http://localhost:8731/` · 예시 글: `http://localhost:8731/preview.html`.
3. 좁은 칼럼·그린 액센트·두 섹션 헤더가 Figma와 일치하면 정상.
