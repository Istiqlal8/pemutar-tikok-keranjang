// Opens the side panel player and tells it which video to play.
function setVideo(pageUrl) {
  chrome.storage.session.set({ playUrl: pageUrl, playAt: Date.now() });
}

chrome.runtime.onMessage.addListener((message, sender) => {
  if (!message || !sender.tab) return;
  if (message.play) {
    // open() must run inside the click gesture, so it is not awaited after storage.
    chrome.sidePanel.open({ tabId: sender.tab.id });
    setVideo(message.play);
  } else if (message.follow) {
    setVideo(message.follow);
  }
});
