(()=>{
  const dbrEle = document.getElementById("dbr")
  const src = dbrEle.getAttribute("imgSrc");
  const template = dbrEle.getAttribute("template");
  DBRChromeExtension.decodeFromSrc(src,template);
})();


