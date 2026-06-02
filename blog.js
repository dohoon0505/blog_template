/* ============================================================
 * blog.js  —  공용 전역 스크립트 (호스트 페이지에서 한 번만 로드)
 * ------------------------------------------------------------
 * 이 파일은 블로그 본문(완성본 조각) 안에서 호출하지 않습니다.
 * 워드프레스/카페24 테마처럼 "호스트 페이지"가 전역으로 1회 로드하면,
 * 그 안에 삽입된 모든 .page 본문 조각의 '목차 여닫기'가 자동 작동합니다.
 *
 * 동작: .chapter-toggle 클릭 → .chapter-body 를 max-height 트랜지션으로
 *       부드럽게 접고/펴고, .hide 클래스를 토글합니다.
 * ============================================================ */
(function () {
  function bindChapterToggle(head) {
    var toggleBtn = head.querySelector('.chapter-toggle');
    var chapter = head.closest('.chapter');
    var chapterBody = chapter && chapter.querySelector('.chapter-body');
    if (!toggleBtn || !chapterBody) return;

    toggleBtn.addEventListener('click', function () {
      var isHidden = chapterBody.classList.contains('hide');

      // 현재 높이를 픽셀로 고정한 뒤 리플로우를 강제해 트랜지션이 걸리게 함
      chapterBody.style.maxHeight = chapterBody.scrollHeight + 'px';
      void chapterBody.offsetHeight;

      chapterBody.style.maxHeight = isHidden ? chapterBody.scrollHeight + 'px' : '0';
      chapterBody.classList.toggle('hide', !isHidden);
    });
  }

  function init() {
    // 한 페이지에 챕터(목차)가 여러 개여도 모두 바인딩
    var heads = document.querySelectorAll('.chapter .chapter-head');
    for (var i = 0; i < heads.length; i++) bindChapterToggle(heads[i]);
  }

  // 호스트가 <head>에서 먼저 로드하든(파싱 전), 본문 삽입 후 늦게 로드하든 안전
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
