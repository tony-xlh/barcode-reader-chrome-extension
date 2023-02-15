init();

async function init(){
  const distURL = new URL(chrome.runtime.getURL("/dist/"));
  console.log(distURL);
  await loadLibrary(distURL+"/dbr.js","text/javascript");
  await loadLibrary(distURL+"/reader.js","text/javascript");
}

function loadLibrary(src,type,id,data){
  return new Promise(function (resolve, reject) {
    let scriptEle = document.createElement("script");
    scriptEle.setAttribute("type", type);
    scriptEle.setAttribute("src", src);
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
      console.log(src+" loaded")
      resolve(true);
    });
    scriptEle.addEventListener("error", (ev) => {
      console.log("Error on loading "+src, ev);
      reject(ev);
    });
  });
}