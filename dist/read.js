console.log("read");
(()=>{
  const dbrEle = document.getElementById("dbr")
  const src = dbrEle.getAttribute("imgSrc");
  const template = dbrEle.getAttribute("template");
  decodeFromSrc(src,template);
})();


