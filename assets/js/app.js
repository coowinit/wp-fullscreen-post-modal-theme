
const posts = [
  {
    id: 1,
    slug: 'route-modal-pattern',
    title: '如何把博客详情页做成可分享的全屏弹层',
    excerpt: '从列表页点进详情时显示全屏弹层，直接访问链接时显示独立详情页，这是博客类内容站很平衡的一种交互模式。',
    category: '前端交互',
    date: '2026-04-14',
    author: { name: 'Coowin Studio', bio: '专注于内容站点交互和前端架构设计。', avatar: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=200&q=80' },
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    tags: ['Modal Route', 'WordPress', 'UI/UX'],
    content: `
      <p>这种设计的核心不是“做一个普通弹窗”，而是让详情页本身拥有真实 URL，同时又能在列表上下文中呈现为全屏阅读层。这样就兼顾了阅读体验和分享能力。</p>
      <p>当用户从列表页点击进入时，背景列表仍然存在，因此右上角的关闭按钮有明确含义：返回列表，并恢复原来的滚动位置。直接访问该文章链接时，则应该显示为普通详情页，而不是弹窗。</p>
      <h2>为什么这种模式适合博客</h2>
      <p>博客首页的核心任务是浏览和探索。用户浏览一组卡片时，通常不希望每次阅读一篇文章都完全离开当前上下文。全屏详情层能减少打断感，让用户更容易继续阅读下一篇。</p>
      <blockquote>一句话概括：同一个详情 URL，可以根据进入方式呈现成弹层或独立页面。</blockquote>
      <p>在 WordPress 中，你可以把卡片列表做成归档模板，把单篇文章做成 single.php，再在前端增加一层“从列表打开时用弹层展示”的逻辑。</p>
    `,
    related: ['wp-theme-structure','history-api-in-practice','single-page-vs-modal-page']
  },
  {
    id: 2,
    slug: 'wp-theme-structure',
    title: 'WordPress 主题里应该怎么拆分列表模板和详情模板',
    excerpt: '先完成 HTML 原型，再拆成 header.php、footer.php、archive.php、single.php，会比一开始直接写 PHP 更稳。',
    category: 'WordPress',
    date: '2026-04-12',
    author: { name: 'Coowin Studio', bio: '专注于内容站点交互和前端架构设计。', avatar: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=200&q=80' },
    cover: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    tags: ['Theme', 'PHP', 'Template'],
    content: `<p>最推荐的顺序是：先静态原型，再模板切片，最后接 WordPress 数据。这样你可以先把结构、间距、弹层行为、移动端布局全部确认，再考虑循环和字段输出。</p><h2>推荐的模板拆分方式</h2><p>首页或博客归档负责输出文章卡片，single.php 负责单篇文章结构，公共头尾放在 header.php 和 footer.php。弹层内层可以抽成 template-parts/content-single-modal.php。</p>`,
    related: ['route-modal-pattern','card-grid-best-practice','modal-accessibility-notes']
  },
  {
    id: 3,
    slug: 'card-grid-best-practice',
    title: '博客卡片网格布局的常见细节',
    excerpt: '卡片不是堆信息越多越好，重点在层级、留白、缩略图比例和 hover 行为。',
    category: '视觉设计',
    date: '2026-04-10',
    author: { name: 'Coowin Studio', bio: '专注于内容站点交互和前端架构设计。', avatar: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=200&q=80' },
    cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    tags: ['Grid', 'Card', 'Layout'],
    content: `<p>卡片列表页更像目录页，而不是内容页。标题、摘要、日期、分类和一个清晰的点击入口就足够了。过多元素会削弱浏览效率。</p><p>建议统一缩略图比例，例如 16:10 或 4:3，并确保标题控制在两到三行以内。移动端则要优先保证点击区域足够大，避免误触。</p>`,
    related: ['route-modal-pattern','wp-theme-structure','single-page-vs-modal-page']
  },
  {
    id: 4,
    slug: 'history-api-in-practice',
    title: '用 History API 让弹层地址支持前进后退',
    excerpt: 'pushState 和 popstate 可以让“打开详情”和“关闭详情”与浏览器历史栈自然协作。',
    category: 'JavaScript',
    date: '2026-04-08',
    author: { name: 'Coowin Studio', bio: '专注于内容站点交互和前端架构设计。', avatar: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=200&q=80' },
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    tags: ['History API', 'pushState', 'UX'],
    content: `<p>当用户点击卡片时，可以调用 <code>history.pushState</code> 把地址改成文章的 permalink，同时弹出详情层。关闭时则通过 <code>history.back</code> 或替换回列表 URL。</p><p>这样浏览器后退不再是“离开站点”，而是“关闭当前详情层”，体验会自然很多。</p>`,
    related: ['route-modal-pattern','modal-accessibility-notes','single-page-vs-modal-page']
  },
  {
    id: 5,
    slug: 'single-page-vs-modal-page',
    title: '什么时候该整页跳转，什么时候该用详情弹层',
    excerpt: '如果内容很重、SEO 很重要，详情页必须独立存在；如果浏览连续性更重要，可以增加弹层阅读入口。',
    category: '产品设计',
    date: '2026-04-06',
    author: { name: 'Coowin Studio', bio: '专注于内容站点交互和前端架构设计。', avatar: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=200&q=80' },
    cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    tags: ['SEO', 'Product', 'Interaction'],
    content: `<p>严格来说，这不是二选一。最好的做法是详情页既能独立访问，也能在特定上下文里作为弹层被打开。这样可以同时满足搜索引擎、分享传播和浏览体验。</p>`,
    related: ['route-modal-pattern','history-api-in-practice','card-grid-best-practice']
  },
  {
    id: 6,
    slug: 'modal-accessibility-notes',
    title: '全屏详情弹层还要注意哪些可访问性细节',
    excerpt: 'Esc 关闭、焦点管理、aria 属性、滚动锁定，这些都不应该忽略。',
    category: '可访问性',
    date: '2026-04-05',
    author: { name: 'Coowin Studio', bio: '专注于内容站点交互和前端架构设计。', avatar: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=200&q=80' },
    cover: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
    tags: ['A11y', 'Modal', 'Frontend'],
    content: `<p>用户打开详情层后，焦点应该进入弹层内部；关闭后，焦点最好回到之前点击的卡片。对于键盘用户和屏幕阅读器用户来说，这些细节很重要。</p><p>此外，还要处理 body 滚动锁定，避免背景列表在详情阅读时继续滚动。</p>`,
    related: ['route-modal-pattern','history-api-in-practice','wp-theme-structure']
  }
];
const grid = document.getElementById('postGrid');
const modal = document.getElementById('postModal');
const detailWrap = document.getElementById('detailWrap');
const modalClose = document.getElementById('modalClose');
let lastActiveTrigger = null;
let lastScrollY = 0;
const baseTitle = document.title;
function bySlug(slug){return posts.find(p=>p.slug===slug)}
function renderCards() {
  grid.innerHTML = posts.map(post => `
    <article class="post-card">
      <button class="post-thumb open-post" type="button" data-slug="${post.slug}" aria-label="打开文章：${post.title}">
        <img src="${post.cover}" alt="${post.title}" />
      </button>
      <div class="post-meta">
        <span class="chip">${post.category}</span>
        <span>${post.date}</span>
      </div>
      <h4>${post.title}</h4>
      <p>${post.excerpt}</p>
      <footer>
        <span class="read-link">继续阅读 →</span>
        <button class="btn btn-secondary open-post" type="button" data-slug="${post.slug}">查看详情</button>
      </footer>
    </article>
  `).join('');
}
function shareLinks(post){
  const url = permalinkFor(post);
  return [
    { label: '复制链接', url, copy: true },
    { label: 'X / Twitter', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}` },
    { label: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` }
  ];
}
function relatedPosts(post){
  return post.related.map(bySlug).filter(Boolean);
}
function adjacent(post){
  const idx = posts.findIndex(p=>p.slug===post.slug);
  return { prev: idx < posts.length - 1 ? posts[idx+1] : null, next: idx > 0 ? posts[idx-1] : null };
}
function permalinkFor(post){
  const url = new URL(window.location.href);
  url.searchParams.set('post', post.slug);
  return url.toString();
}
function buildDetail(post){
  const rel = relatedPosts(post);
  const adj = adjacent(post);
  return `
    <article>
      <div class="detail-cover"><img src="${post.cover}" alt="${post.title}" /></div>
      <div class="detail-meta">
        <span class="chip">${post.category}</span>
        <span>${post.date}</span>
        <span>阅读 6 分钟</span>
      </div>
      <h1 class="detail-title" id="detailTitle">${post.title}</h1>
      <p class="detail-excerpt">${post.excerpt}</p>
      <div class="detail-layout">
        <div>
          <div class="detail-content">${post.content}
            <div class="author-card">
              <img class="author-avatar" src="${post.author.avatar}" alt="${post.author.name}" />
              <div>
                <h4>${post.author.name}</h4>
                <p>${post.author.bio}</p>
                <a class="share-pill" href="#">查看作者页面</a>
              </div>
            </div>
            <section class="share-block">
              <h3 class="detail-subtitle">分享这篇文章</h3>
              <div class="share-list">
                ${shareLinks(post).map(item => item.copy ? `<button class="share-pill js-copy-link" data-link="${item.url}">${item.label}</button>` : `<a class="share-pill" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.label}</a>`).join('')}
              </div>
            </section>
            <section class="related-section share-block">
              <h3 class="detail-subtitle">相关文章</h3>
              <div class="related-grid">
                ${rel.map(item => `<article class="related-card"><h4>${item.title}</h4><p>${item.excerpt}</p><button class="share-pill open-post" data-slug="${item.slug}" type="button">阅读这篇</button></article>`).join('')}
              </div>
            </section>
            <div class="adjacent-links">
              <div class="adjacent-item">${adj.prev ? `<strong>上一篇</strong><button class="share-pill open-post" data-slug="${adj.prev.slug}" type="button">${adj.prev.title}</button>` : `<strong>上一篇</strong><span>已经是最后一篇</span>`}</div>
              <div class="adjacent-item">${adj.next ? `<strong>下一篇</strong><button class="share-pill open-post" data-slug="${adj.next.slug}" type="button">${adj.next.title}</button>` : `<strong>下一篇</strong><span>已经是最新一篇</span>`}</div>
            </div>
            <section class="comments-preview">
              <h3 class="detail-subtitle">评论区预览</h3>
              <div class="comment-card"><strong>Amy</strong><p>这种“详情即真实路由、列表里又能弹层阅读”的方式很适合内容站。</p></div>
              <div class="comment-card"><strong>Leo</strong><p>我喜欢这里把作者信息、分享按钮和相关文章都放在详情阅读流里，层级很顺。</p></div>
            </section>
          </div>
        </div>
        <aside class="detail-sidebar">
          <section class="side-card">
            <h5>作者</h5>
            <p>${post.author.name}</p>
            <p>${post.author.bio}</p>
          </section>
          <section class="side-card">
            <h5>标签</h5>
            <div class="inline-tags">${post.tags.map(tag => `<span class="chip">${tag}</span>`).join('')}</div>
          </section>
          <section class="side-card">
            <h5>说明</h5>
            <ul>
              <li>静态预览只演示结构与交互</li>
              <li>WordPress 主题动态版位于 <code>theme/insight-journal/</code></li>
              <li>分享按钮和相关文章在主题中有动态实现</li>
            </ul>
          </section>
        </aside>
      </div>
    </article>
  `;
}
function openPost(slug, push = true){
  const post = bySlug(slug);
  if(!post) return;
  detailWrap.innerHTML = '<div class="loading-state">正在加载文章详情…</div>';
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('lock-scroll');
  if (push) {
    lastScrollY = window.scrollY;
    history.pushState({post: slug, scrollY: lastScrollY}, '', permalinkFor(post));
  }
  setTimeout(() => {
    detailWrap.innerHTML = buildDetail(post);
    document.title = `${post.title} · Insight Journal`;
    modalClose.style.display = 'grid';
  }, 160);
}
function closeModal(restore = true){
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('lock-scroll');
  detailWrap.innerHTML = '';
  document.title = baseTitle;
  if (restore) window.scrollTo({top:lastScrollY, behavior:'instant'});
  if (lastActiveTrigger?.focus) lastActiveTrigger.focus();
}
function handleDirectVisit(){
  const slug = new URL(window.location.href).searchParams.get('post');
  if (!slug) return;
  const post = bySlug(slug);
  if (!post) return;
  detailWrap.innerHTML = buildDetail(post);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('lock-scroll');
  modalClose.style.display = 'none';
  document.title = `${post.title} · Insight Journal`;
}
renderCards();
handleDirectVisit();
document.addEventListener('click', async (event) => {
  const trigger = event.target.closest('.open-post');
  if (trigger) {
    lastActiveTrigger = trigger;
    openPost(trigger.dataset.slug, true);
    return;
  }
  if (event.target.matches('[data-close="true"]')) {
    history.back();
    return;
  }
  if (event.target.classList.contains('js-copy-link')) {
    const link = event.target.dataset.link;
    await navigator.clipboard.writeText(link);
    event.target.textContent = '已复制链接';
    setTimeout(() => event.target.textContent = '复制链接', 1200);
  }
});
modalClose.addEventListener('click', ()=> history.back());
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open') && modalClose.style.display !== 'none') history.back();
});
window.addEventListener('popstate', () => {
  const slug = new URL(window.location.href).searchParams.get('post');
  if (slug) {
    openPost(slug, false);
  } else {
    closeModal(true);
  }
});
