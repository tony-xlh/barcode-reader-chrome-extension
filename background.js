chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "read-barcodes-menu",
    "title": "Read barcodes from the image",
    "contexts": ["image"]
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  chrome.tabs.sendMessage(tab.id, {info:info}, function(response) {
		console.log(response.farewell);
  });
});

