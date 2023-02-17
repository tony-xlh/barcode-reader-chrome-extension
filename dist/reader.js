let DBRChromeExtension = {
  DBRReader:undefined,
  previousDBRTemplate:"",
  updateRuntimeSettings: async function(template) {
    if (template != undefined) {
      if (this.previousDBRTemplate != template) {
        if (template === "") {
          await this.DBRReader.resetRuntimeSettings();
        }else{
          await this.DBRReader.initRuntimeSettingsWithString(template);
        }
        this.previousDBRTemplate = template;
      }
    }
  },
  decode:async function(img, template) {
    this.showModal();
    if (!this.DBRReader) {
      this.updateStatus("Initializing...");
      this.DBRReader = await Dynamsoft.DBR.BarcodeReader.createInstance();
    }
    this.updateRuntimeSettings(template);
    this.updateStatus("Decoding...");
    let results;
    try {
      results = await this.DBRReader.decode(img);  
    } catch (error) {
      this.updateStatus("Error "+error);
      return;
    }
    this.updateStatus("Found "+results.length+((results.length>1)?" barcodes.":" barcode."));
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
  },
  updateStatus: function(text) {
    let status = document.querySelector(".dbr-status");
    if (status) {
      status.innerText = text;
    }
  },
  showModal: function(){
    let modal = document.createElement("div");
    modal.className = "dbr-modal";
    let status = document.createElement("div");
    status.className = "dbr-status";
    let resultList = document.createElement("ol");
    resultList.className = "dbr-results";
    let closeBtn = document.createElement("button");
    closeBtn.innerText = "Close";
    closeBtn.addEventListener("click", () => {
      this.removeModal();
    });
    modal.appendChild(status);
    modal.appendChild(resultList);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
  },
  removeModal: function(){
    document.querySelector(".dbr-modal").remove();
  },
  decodeFromSrc: function(src, template) {
    if (src) {
      let img = document.createElement("img");
      img.crossOrigin = "Anonymous";
      img.src = src;  
      img.onerror = function (e) {
        DBRChromeExtension.showModal();
        DBRChromeExtension.updateStatus("Unable to load the image");
      }
      img.onload = async function() {
        await DBRChromeExtension.decode(img, template);
        document.getElementById("dbr").remove();
      }
    }
  }
}
