import xhook from "xhook";

xhook.enable();

xhook.before((request, callback) => {
  console.log("NEW REQUEST CAME");
  // console.log("THIS", request);
  // window.postMessage(request.url, "*");
  // chrome.runtime.sendMessage(request.url);
  // chrome.tabs.sendMessage(1, request.url);
  // callback();
});

