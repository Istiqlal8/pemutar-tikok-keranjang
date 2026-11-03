// Isolated world: hands the player page URL to the MAIN-world scripts
// and routes "Putar video" clicks to the side panel.
document.documentElement.dataset.ttkPlayer = chrome.runtime.getURL('player.html');

document.addEventListener('click', (event) => {
  const link = event.target.closest && event.target.closest('.ttk-play');
  if (!link) return;
  event.preventDefault();
  chrome.runtime.sendMessage({ play: link.dataset.pageUrl });
}, true);

// The video in view changed while scrolling: let an open side panel follow it.
document.addEventListener('ttk-current', (event) => {
  chrome.runtime.sendMessage({ follow: event.detail });
});
