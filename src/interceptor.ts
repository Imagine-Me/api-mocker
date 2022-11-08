import xhook from "xhook";


xhook.before((request, callback) => {
  console.log(request);
  callback();
});
