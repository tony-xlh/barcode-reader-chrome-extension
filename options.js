function save() {
  const dbrLicense = document.getElementById("dbrLicense");
  chrome.storage.sync.set({
    dbrLicense: dbrLicense.value
  }, function() {
    // Update status to let user know options were saved.
    alert("saved");
  });
}

function load() {
  chrome.storage.sync.get({
    dbrLicense: ''
  }, function(items) {
    if (items.dbrLicense) {
      document.getElementById("dbrLicense").value = items.dbrLicense;
    }
  });
}

document.getElementById("save").addEventListener("click", () => {
  save();
});
document.addEventListener('DOMContentLoaded', load);