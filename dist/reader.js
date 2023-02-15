let reader;

async function decode(img) {
  if (!reader) {
    reader = await Dynamsoft.DBR.BarcodeReader.createInstance();
  }
  const results = await reader.decode(img);
  alert("Found "+results.length+" barcode(s).");
}