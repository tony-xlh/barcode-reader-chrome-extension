let DBRReader;
let previousDBRTemplate = "";

async function updateRuntimeSettings(template){
  if (template != undefined) {
    if (previousDBRTemplate != template) {
      if (template === "") {
        await DBRReader.resetRuntimeSettings();
      }else{
        await DBRReader.initRuntimeSettingsWithString(template);
      }
      previousDBRTemplate = template;
    }
  }
}

async function decode(img, template) {
  showModal();
  if (!DBRReader) {
    updateStatus("Initializing...");
    DBRReader = await Dynamsoft.DBR.BarcodeReader.createInstance();
  }
  updateRuntimeSettings(template);
  updateStatus("Decoding...");
  let results;
  try {
    results = await DBRReader.decode(img);  
  } catch (error) {
    updateStatus("Error "+error);
    return;
  }
  updateStatus("Found "+results.length+((results.length>1)?" barcodes.":" barcode."));
  if (results.length > 0) {
    const resultList = document.querySelector(".dbr-results");
    resultList.innerHTML = "";
    for (let index = 0; index < results.length; index++) {
      const result = results[index];
      const item = document.createElement("li");
      item.innerText = result.barcodeFormatString + ": " + result.barcodeText;
      resultList.appendChild(item);
    }
  }
}

function updateStatus(text){
  let status = document.querySelector(".dbr-status");
  if (status) {
    status.innerText = text;
  }
}

function showModal(){
  let modal = document.createElement("div");
  modal.className = "dbr-modal";
  let status = document.createElement("div");
  status.className = "dbr-status";
  let resultList = document.createElement("ol");
  resultList.className = "dbr-results";
  let closeBtn = document.createElement("button");
  closeBtn.innerText = "Close";
  closeBtn.addEventListener("click", () => {
    removeModal();
  });
  modal.appendChild(status);
  modal.appendChild(resultList);
  modal.appendChild(closeBtn);
  document.body.appendChild(modal);
}

function removeModal(){
  document.querySelector(".dbr-modal").remove();
}

function decodeFromSrc(src, template) {
  if (src) {
    let img = document.createElement("img");
    img.crossOrigin = "Anonymous";
    img.src = src;  
    img.onerror = function (e) {
      showModal();
      updateStatus("Unable to load the image");
    }
    img.onload = async function() {
      await decode(img, template);
      document.getElementById("dbr").remove();
    }
  }
}