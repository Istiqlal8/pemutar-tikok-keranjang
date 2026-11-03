// Floating cart button + product panel for the video currently on screen.
(() => {
  const { store, listeners } = window.__ttk;
  let button, panel, currentId = null;

  function idFromUrl() {
    const match = location.pathname.match(/\/(?:video|photo)\/(\d+)/);
    return match && store.has(match[1]) ? match[1] : null;
  }

  function centeredVideo() {
    const mid = window.innerHeight / 2;
    let best = null, bestDist = Infinity;
    for (const v of document.querySelectorAll('video')) {
      const r = v.getBoundingClientRect();
      if (r.height === 0 || r.bottom < 0 || r.top > window.innerHeight) continue;
      const dist = Math.abs(r.top + r.height / 2 - mid);
      if (dist < bestDist) { best = v; bestDist = dist; }
    }
    return best;
  }

  function idFromFeed() {
    let el = centeredVideo();
    for (let i = 0; el && i < 15; i++, el = el.parentElement) {
      const html = el.outerHTML;
      for (const id of store.keys()) if (html.includes(id)) return id;
    }
    return null;
  }

  function card(product) {
    const a = document.createElement('a');
    a.className = 'ttk-card';
    a.href = product.url;
    a.target = '_blank';
    a.rel = 'noopener';
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = '';
    const title = document.createElement('span');
    title.textContent = product.title;
    a.append(img, title);
    return a;
  }

  function playLink() {
    const a = document.createElement('a');
    a.className = 'ttk-play';
    const pageUrl = `https://www.tiktok.com/@_/video/${currentId}`;
    a.dataset.pageUrl = pageUrl;
    a.href = `${document.documentElement.dataset.ttkPlayer}?url=${encodeURIComponent(pageUrl)}`;
    a.target = '_blank';
    a.textContent = '▶ Putar video';
    return a;
  }

  function renderPanel() {
    panel.replaceChildren(playLink());
    const products = store.get(currentId) || [];
    products.forEach((p) => panel.appendChild(card(p)));
  }

  function build() {
    button = document.createElement('button');
    button.className = 'ttk-button';
    button.title = 'Keranjang';
    button.addEventListener('click', () => {
      panel.classList.toggle('ttk-open');
      renderPanel();
    });
    panel = document.createElement('div');
    panel.className = 'ttk-panel';
    document.body.append(button, panel);
  }

  function refresh() {
    if (!document.body) return;
    if (!button) build();
    const id = idFromUrl() || idFromFeed();
    if (id === currentId) return;
    currentId = id;
    const count = id ? store.get(id).length : 0;
    button.textContent = `🛒 ${count}`;
    button.classList.toggle('ttk-show', count > 0);
    if (count) {
      const pageUrl = `https://www.tiktok.com/@_/video/${id}`;
      document.dispatchEvent(new CustomEvent('ttk-current', { detail: pageUrl }));
    }
    if (!count) panel.classList.remove('ttk-open');
    else if (panel.classList.contains('ttk-open')) renderPanel();
  }

  listeners.add(() => { currentId = undefined; refresh(); });
  setInterval(refresh, 700);
})();
