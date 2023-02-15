let DBRReader;
async function decode(img) {
  showModal();
  if (!DBRReader) {
    updateStatus("Initializing...");
    DBRReader = await Dynamsoft.DBR.BarcodeReader.createInstance();
  }
  updateStatus("Decoding...");
  const results = await DBRReader.decode(img);
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

function decodeFromSrc() {
  let src = document.getElementById("dbr").getAttribute("imgSrc");
  if (src) {
    console.log("decoding "+src);
    let img = document.createElement("img");
    img.src = src;
    img.onload = async function() {
      await decode(img);
      document.getElementById("dbr").remove();
    }
  }
  
}