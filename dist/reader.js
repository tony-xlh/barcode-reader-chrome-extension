let reader;
async function decode(img) {
  if (!reader) {
    reader = await Dynamsoft.DBR.BarcodeReader.createInstance();
  }
  const results = await reader.decode(img);
  alert("Found "+results.length+" barcode(s).");
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