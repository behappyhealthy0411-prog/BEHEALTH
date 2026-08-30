(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  const isCategory = path === 'body_signals.html';
  document.body.classList.add('body-signals-scope', isCategory ? 'body-signals-category' : 'body-signals-article');

  const nav = document.querySelector('nav');
  if (nav) {
    nav.className = 'bs-site-nav';
    nav.innerHTML = `
      <div class="bs-nav-inner">
        <a class="bs-brand" href="index.html" aria-label="代謝美學首頁">
          <span class="bs-brand-name">代謝美學</span>
          <span class="bs-brand-en">METABOLIC ESTHETICS</span>
        </a>
        <div class="bs-nav-links">
          <a class="bs-home-link" href="index.html">首頁</a>
          <a class="bs-tree-link" href="body_signals.html" aria-current="page">身體訊號樹</a>
          <a class="bs-cta" href="https://lin.ee/pzxDU3O" target="_blank" rel="noopener">預約諮詢</a>
        </div>
      </div>`;
  }

  const breadcrumb = document.createElement('div');
  breadcrumb.className = 'bs-breadcrumb';
  breadcrumb.setAttribute('aria-label', '頁面路徑');
  breadcrumb.innerHTML = isCategory
    ? '<a href="index.html">代謝美學首頁</a><span>／</span>身體訊號樹'
    : '<a href="index.html">代謝美學首頁</a><span>／</span><a href="body_signals.html">身體訊號樹</a><span>／</span>閱讀文章';
  if (nav) nav.insertAdjacentElement('afterend', breadcrumb);
  else document.body.insertAdjacentElement('afterbegin', breadcrumb);

  if (isCategory) {
    const main = document.querySelector('main');
    const grid = main && Array.from(main.children).find((el) => el.matches('div.grid'));
    if (grid) {
      grid.classList.add('bs-category-grid');
      Array.from(grid.children).forEach((section) => {
        if (!section.matches('section')) return;
        section.classList.add('bs-category-section');
        section.querySelectorAll('a[href^="body_signals_"]').forEach((link) => {
          const card = link.closest('div');
          if (card) card.classList.add('bs-category-card');
        });
      });
    }
  } else {
    document.querySelectorAll('section').forEach((section) => {
      const label = section.textContent.replace(/\s+/g, ' ').trim();
      if (label.includes('這篇文章會帶你看懂') || label.includes('這篇文章想陪你理解')) {
        section.classList.add('bs-question-section');
        section.querySelectorAll('div').forEach((div) => {
          const text = div.textContent.trim();
          if (/^Q\s*[123]/i.test(text) && text.length < 240) div.classList.add('bs-question-card');
        });
      }
      if (label.includes('延伸閱讀') && section.querySelector('a')) section.classList.add('bs-related-section');
    });
  }

  document.querySelectorAll('a[href="body_signals.html"]').forEach((link) => {
    if (!link.closest('.bs-site-nav') && !link.closest('.bs-site-footer')) link.textContent = '返回身體訊號樹';
  });

  document.querySelectorAll('footer').forEach((footer) => footer.remove());
  const footer = document.createElement('footer');
  footer.className = 'bs-site-footer';
  footer.innerHTML = `
    <p class="bs-footer-title">身體訊號，是身體的一種語言</p>
    <p class="bs-footer-copy">先理解身體正在說什麼，再找到適合現在的照顧方式。</p>
    <div class="bs-footer-actions">
      <a href="body_signals.html">回到身體訊號樹</a>
      <a href="index.html">回到代謝美學首頁</a>
      <a class="bs-footer-cta" href="https://lin.ee/pzxDU3O" target="_blank" rel="noopener">LINE 預約諮詢</a>
    </div>
    <p class="bs-copyright">© 2026 代謝美學 METABOLIC ESTHETICS</p>`;
  document.body.appendChild(footer);
})();

