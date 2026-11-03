// Plays a TikTok video via tikwm. Runs in the side panel (URL from storage)
// or in a tab (URL from ?url=).
const status = document.getElementById('status');
const video = document.getElementById('video');

let current = null;

async function play(pageUrl) {
  if (!pageUrl || pageUrl === current) return;
  current = pageUrl;
  video.pause();
  video.hidden = true;
  video.removeAttribute('src');
  status.hidden = false;
  status.textContent = 'Memuat video…';
  try {
    const api = `https://www.tikwm.com/api/?hd=1&url=${encodeURIComponent(pageUrl)}`;
    const body = await (await fetch(api)).json();
    const src = body.data && (body.data.hdplay || body.data.play);
    if (!src) throw new Error(body.msg || 'video tidak ditemukan');
    if (pageUrl !== current) return; // user already scrolled to another video
    video.src = src;
    video.play().catch(() => { video.muted = true; video.play(); });
    video.hidden = false;
    status.hidden = true;
  } catch (err) {
    if (pageUrl !== current) return;
    current = null; // allow retry for the same video
    status.textContent = `Gagal memuat video: ${err.message}. Coba lagi beberapa saat.`;
  }
}

const fromQuery = new URLSearchParams(location.search).get('url');
if (fromQuery) {
  play(fromQuery);
} else {
  status.textContent = 'Klik ▶ Putar video di TikTok.';
  chrome.storage.session.get('playUrl').then(({ playUrl }) => playUrl && play(playUrl));
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'session' && changes.playAt) {
      chrome.storage.session.get('playUrl').then(({ playUrl }) => play(playUrl));
    }
  });
}
