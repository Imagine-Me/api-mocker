import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Popup = () => {
  useEffect(() => {
    const newUrl = `chrome-extension://${chrome.runtime.id}/index.html`;
    chrome.tabs.create({ url: newUrl });
  }, []);
  return null;
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
