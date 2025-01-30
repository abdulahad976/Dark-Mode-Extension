chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleDarkMode") {
    toggleDarkMode(request.enabled);
  }
});

function toggleDarkMode(enabled) {
  if (enabled) {
    document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
    document.body.style.backgroundColor = '#000';
  } else {
    document.documentElement.style.filter = 'none';
    document.body.style.backgroundColor = '';
  }
}