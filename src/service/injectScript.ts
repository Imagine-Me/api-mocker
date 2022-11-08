const inject = () => {
  const s = document.createElement("script");
  s.setAttribute("src", chrome.runtime.getURL("js/interceptor.js"));
  document.head.append(s);
};

export default inject;
