import inject from "./service/injectScript";

window.addEventListener("message", (event) => {
  console.log("THIS", event);
});

chrome.runtime.onMessage.addListener((event) => {
  console.log("THIS IS FROM RUN TIME", event);
});


inject();
