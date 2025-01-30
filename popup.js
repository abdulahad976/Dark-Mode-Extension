document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleDarkMode');
  const statusText = document.querySelector('.status-text');

  // Get stored state
  chrome.storage.local.get('darkModeEnabled', ({ darkModeEnabled }) => {
    toggleButton.classList.toggle('active', darkModeEnabled);
    statusText.textContent = `Dark Mode: ${darkModeEnabled ? 'On' : 'Off'}`;
  });

  toggleButton.addEventListener('click', () => {
    const isActive = toggleButton.classList.toggle('active');
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: toggleDarkMode,
        args: [isActive]
      });
    });

    statusText.textContent = `Dark Mode: ${isActive ? 'On' : 'Off'}`;
    chrome.storage.local.set({ darkModeEnabled: isActive });
  });
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