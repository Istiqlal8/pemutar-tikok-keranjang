// Collects shopping-cart products per video id from TikTok page data and API responses.
(() => {
  const store = new Map(); // videoId -> [{ id, title, image, url }]
  window.__ttk = { store, listeners: new Set() };

  function notify() {
    window.__ttk.listeners.forEach((fn) => fn());
  }

  function parseProduct(entry) {
    let inner = {};
    try { inner = JSON.parse(entry.extra || '{}'); } catch (_) { /* keep empty */ }
    const id = String(entry.id || '');
    if (!id) return null;
    return {
      id,
      title: inner.title || entry.keyword || 'Produk',
      image: inner.cover_url || (inner.img_url || [])[0] || '',
      url: inner.seo_url || `https://shop-id.tokopedia.com/pdp/produk/${id}`,
    };
  }

  function productsFromAnchors(anchors) {
    const products = [];
    for (const anchor of anchors) {
      let list = [];
      try { list = JSON.parse(anchor.extra || '[]'); } catch (_) { continue; }
      if (!Array.isArray(list)) continue;
      for (const entry of list) {
        if (String(entry.type) !== '33') continue;
        const product = parseProduct(entry);
        if (product && !products.some((p) => p.id === product.id)) products.push(product);
      }
    }
    return products;
  }

  function walk(node, depth) {
    if (!node || typeof node !== 'object' || depth > 12) return;
    if (Array.isArray(node)) { node.forEach((n) => walk(n, depth + 1)); return; }
    if (node.id && Array.isArray(node.anchors)) {
      const products = productsFromAnchors(node.anchors);
      if (products.length) store.set(String(node.id), products);
    }
    for (const key in node) walk(node[key], depth + 1);
  }

  function ingest(json) {
    const before = store.size;
    walk(json, 0);
    if (store.size !== before) notify();
  }

  function hookFetch() {
    const original = window.fetch;
    window.fetch = async function (...args) {
      const response = await original.apply(this, args);
      const url = String(args[0] && args[0].url ? args[0].url : args[0]);
      if (url.includes('/api/')) {
        response.clone().json().then(ingest).catch(() => {});
      }
      return response;
    };
  }

  function hookXhr() {
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
      if (String(url).includes('/api/')) {
        this.addEventListener('load', () => {
          if (this.responseType && this.responseType !== 'text') return;
          try { ingest(JSON.parse(this.responseText)); } catch (_) { /* not JSON */ }
        });
      }
      return open.call(this, method, url, ...rest);
    };
  }

  function readEmbedded() {
    const el = document.getElementById('__UNIVERSAL_DATA_FOR_REHYDRATION__');
    if (!el) return;
    try { ingest(JSON.parse(el.textContent)); } catch (_) { /* ignore */ }
  }

  hookFetch();
  hookXhr();
  document.addEventListener('DOMContentLoaded', readEmbedded);
})();
