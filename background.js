chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ darkModeEnabled: false });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getDarkModeState") {
    chrome.storage.local.get('darkModeEnabled', (result) => {
      sendResponse({ enabled: result.darkModeEnabled });
    });
    return true;
  }
});