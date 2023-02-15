init();

async function init(){
  const distURL = new URL(chrome.runtime.getURL("/dist/"));
  await loadLibrary(distURL+"/dbr.js","text/javascript");
  await loadLibrary(distURL+"/reader.js","text/javascript");
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.info);
    if (request.info.srcUrl) {
      const distURL = new URL(chrome.runtime.getURL("/dist/"));
      loadLibrary(distURL+"/read.js","text/javascript","dbr",{imgSrc:request.info.srcUrl});
    }
  }
);

function loadLibrary(srcUrl,type,id,data){
  return new Promise(function (resolve, reject) {
    let scriptEle = document.createElement("script");
    scriptEle.setAttribute("type", type);
    scriptEle.setAttribute("src", srcUrl);
    if (id) {
      scriptEle.id = id;
    }
    if (data) {
      for (let key in data) {
        scriptEle.setAttribute(key, data[key]);
      }
    }
    document.body.appendChild(scriptEle);
    scriptEle.addEventListener("load", () => {
      console.log(srcUrl+" loaded")
      resolve(true);
    });
    scriptEle.addEventListener("error", (ev) => {
      console.log("Error on loading "+srcUrl, ev);
      reject(ev);
    });
  });
}