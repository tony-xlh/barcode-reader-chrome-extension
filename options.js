function save() {
  const dbrLicense = document.getElementById("dbrLicense");
  const template = document.querySelector("textarea");
  chrome.storage.sync.set({
    dbrLicense: dbrLicense.value,
    dbrTemplate: template.value
  }, function() {
    // Update status to let user know options were saved.
    alert("saved");
  });
}

function load() {
  chrome.storage.sync.get({
    dbrLicense: '',
    dbrTemplate: ''
  }, function(items) {
    if (items.dbrLicense) {
      document.getElementById("dbrLicense").value = items.dbrLicense;
    }
    if (items.dbrTemplate) {
      document.querySelector("textarea").value = items.dbrTemplate;
    }
  });
}

document.getElementById("save").addEventListener("click", () => {
  save();
});
document.addEventListener('DOMContentLoaded', load);