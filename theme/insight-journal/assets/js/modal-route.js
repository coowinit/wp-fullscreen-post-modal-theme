(function(){
  if (typeof InsightJournal === 'undefined') return;
  const modal = document.getElementById('postModal');
  const detailWrap = document.getElementById('detailWrap');
  const modalClose = document.getElementById('modalClose');
  if (!modal || !detailWrap || !modalClose) return;

  let lastActiveTrigger = null;
  let lastScrollY = 0;
  const baseTitle = document.title;

  function loadingMarkup() {
    return `<div class="loading-state">${InsightJournal.strings.loading}</div>`;
  }

  function errorMarkup(permalink, postId) {
    return `<div class="error-state"><p>${InsightJournal.strings.error}</p><div class="share-list"><button class="share-pill js-retry" data-post-id="${postId}">${InsightJournal.strings.retry}</button><a class="share-pill" href="${permalink}">${InsightJournal.strings.open}</a></div></div>`;
  }

  function shareMarkup(share) {
    return `<section class="share-block"><h3 class="detail-subtitle">${InsightJournal.strings.share}</h3><div class="share-list">${share.map(item => item.copy ? `<button type="button" class="share-pill js-copy-link" data-link="${item.url}">${item.label}</button>` : `<a class="share-pill" target="_blank" rel="noopener noreferrer" href="${item.url}">${item.label}</a>`).join('')}</div></section>`;
  }

  function relatedMarkup(related) {
    if (!related || !related.length) return '';
    return `<section class="share-block related-section"><h3 class="detail-subtitle">${InsightJournal.strings.related}</h3><div class="related-grid">${related.map(item => `<article class="related-card"><h4>${item.title}</h4><p>${item.excerpt || ''}</p><a class="share-pill" data-modal-link data-post-id="${item.id}" href="${item.permalink}">阅读这篇</a></article>`).join('')}</div></section>`;
  }

  function adjacentMarkup(adjacent) {
    const prev = adjacent && adjacent.previous ? `<a class="share-pill" data-modal-link data-post-id="${adjacent.previous.id}" href="${adjacent.previous.permalink}">${adjacent.previous.title}</a>` : '<span>已经是最后一篇</span>';
    const next = adjacent && adjacent.next ? `<a class="share-pill" data-modal-link data-post-id="${adjacent.next.id}" href="${adjacent.next.permalink}">${adjacent.next.title}</a>` : '<span>已经是最新一篇</span>';
    return `<div class="adjacent-links"><div class="adjacent-item"><strong>${InsightJournal.strings.prev}</strong>${prev}</div><div class="adjacent-item"><strong>${InsightJournal.strings.next}</strong>${next}</div></div>`;
  }

  function detailMarkup(data) {
    const category = data.categories && data.categories[0] ? data.categories[0].name : '';
    const tags = (data.tags || []).map(tag => `<a class="chip" href="${tag.url}">${tag.name}</a>`).join('');
    const author = data.author || {};
    return `
      <article>
        ${data.featured_image ? `<div class="detail-cover"><img src="${data.featured_image}" alt="${data.title}" /></div>` : ''}
        <div class="detail-meta"><span class="chip">${category}</span><span>${data.date}</span><span>阅读 ${data.reading_time} 分钟</span></div>
        <h1 class="detail-title" id="detailTitle">${data.title}</h1>
        ${data.excerpt ? `<p class="detail-excerpt">${data.excerpt}</p>` : ''}
        <div class="detail-layout">
          <div>
            <div class="detail-content">${data.content}
              <section class="author-card">
                ${author.avatar ? `<img class="author-avatar" src="${author.avatar}" alt="${author.name || ''}" />` : ''}
                <div>
                  <h4>${author.name || ''}</h4>
                  <p>${author.bio || '这个作者还没有填写简介。'}</p>
                  ${author.url ? `<a class="share-pill" href="${author.url}">查看作者页面</a>` : ''}
                </div>
              </section>
              ${shareMarkup(data.share || [])}
              ${tags ? `<section class="share-block"><h3 class="detail-subtitle">标签</h3><div class="inline-tags">${tags}</div></section>` : ''}
              ${adjacentMarkup(data.adjacent || {})}
              ${relatedMarkup(data.related || [])}
            </div>
          </div>
          <aside class="detail-sidebar">
            <section class="side-card"><h5>说明</h5><ul><li>弹层内容来自自定义 REST 接口</li><li>关闭后会恢复列表滚动位置</li><li>浏览器后退可关闭详情层</li></ul></section>
          </aside>
        </div>
      </article>`;
  }

  async function fetchPost(postId, fallbackUrl) {
    detailWrap.innerHTML = loadingMarkup();
    try {
      const response = await fetch(`${InsightJournal.restUrl}${postId}`);
      if (!response.ok) throw new Error('Request failed');
      const data = await response.json();
      detailWrap.innerHTML = detailMarkup(data);
      document.title = `${data.title} · ${document.title.split(' · ').pop() || 'Insight Journal'}`;
      modalClose.style.display = 'grid';
      return data;
    } catch (error) {
      detailWrap.innerHTML = errorMarkup(fallbackUrl, postId);
      throw error;
    }
  }

  function openModalShell() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lock-scroll');
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lock-scroll');
    detailWrap.innerHTML = '';
    document.title = baseTitle;
    window.scrollTo({ top: lastScrollY, behavior: 'instant' });
    if (lastActiveTrigger && typeof lastActiveTrigger.focus === 'function') {
      lastActiveTrigger.focus();
    }
  }

  async function openFromLink(link, push = true) {
    const postId = link.getAttribute('data-post-id');
    const href = link.getAttribute('href');
    if (!postId || !href) return;
    lastActiveTrigger = link;
    if (push) {
      lastScrollY = window.scrollY;
      history.pushState({ postId, permalink: href, scrollY: lastScrollY }, '', href);
    }
    openModalShell();
    try { await fetchPost(postId, href); } catch (e) {}
  }

  document.addEventListener('click', async function(event) {
    const modalLink = event.target.closest('[data-modal-link]');
    if (modalLink) {
      event.preventDefault();
      openFromLink(modalLink, true);
      return;
    }

    if (event.target.matches('[data-close="true"]')) {
      history.back();
      return;
    }

    const retry = event.target.closest('.js-retry');
    if (retry) {
      event.preventDefault();
      openModalShell();
      const fallbackUrl = window.location.href;
      try { await fetchPost(retry.getAttribute('data-post-id'), fallbackUrl); } catch (e) {}
      return;
    }

    const copy = event.target.closest('.js-copy-link');
    if (copy) {
      event.preventDefault();
      try {
        await navigator.clipboard.writeText(copy.getAttribute('data-link'));
        copy.textContent = InsightJournal.strings.copied;
        setTimeout(() => { copy.textContent = InsightJournal.strings.copy; }, 1200);
      } catch (e) {}
    }
  });

  modalClose.addEventListener('click', function(){ history.back(); });

  window.addEventListener('keydown', function(event){
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      history.back();
    }
  });

  window.addEventListener('popstate', function(){
    const state = history.state;
    if (state && state.postId && state.permalink) {
      openModalShell();
      lastScrollY = state.scrollY || 0;
      fetchPost(state.postId, state.permalink).catch(function(){});
    } else {
      closeModal();
    }
  });
})();
