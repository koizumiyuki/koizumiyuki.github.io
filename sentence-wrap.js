/* Keep short sentences together on wide screens; let long sentences and mobile text wrap normally. */
(() => {
  if (typeof Intl.Segmenter !== 'function') return;

  const language = document.documentElement.lang === 'ja' ? 'ja' : 'en';
  const segmenter = new Intl.Segmenter(language, { granularity: 'sentence' });
  const blocks = [];
  const exclude = '.metadata, .eyebrow, .blog-meta, .cv-links, .talk-kind, .talk-authors, .talk-count';

  document.querySelectorAll('main p, main .interest-list li').forEach(block => {
    if (block.matches(exclude) || block.children.length !== 0) return;
    const original = block.textContent;
    if (!/[。！？.!?]/.test(original)) return;

    const sentences = Array.from(segmenter.segment(original), part => part.segment);
    block.textContent = '';
    for (const sentence of sentences) {
      const span = document.createElement('span');
      span.className = 'sentence-unit';
      span.textContent = sentence;
      block.append(span);
    }
    blocks.push(block);
  });

  function fitSentences() {
    if (window.innerWidth <= 900) return;
    for (const block of blocks) {
      const style = getComputedStyle(block);
      const available = block.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      for (const span of block.querySelectorAll('.sentence-unit')) {
        span.classList.remove('is-long');
        if (span.getBoundingClientRect().width > available) span.classList.add('is-long');
      }
    }
  }

  let frame = 0;
  function scheduleFit() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(fitSentences);
  }
  scheduleFit();
  window.addEventListener('resize', scheduleFit, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleFit);
})();
