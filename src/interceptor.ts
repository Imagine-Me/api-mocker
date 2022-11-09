import xhook from "xhook";
import { parseUrl } from "./service/urls";

xhook.before((request, callback) => {
  console.log(parseUrl(request.url));
  callback();
});
