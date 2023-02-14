let reader;
window.onload = async function () {
  reader = await Dynamsoft.DBR.BarcodeReader.createInstance();
}