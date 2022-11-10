import xhook, { Request } from "xhook";
import { parseUrl } from "./service/urls";

xhook.before((request, callback) => {
  console.log("URL", request.url);
  console.log(parseUrl(request.url));
  callback();
});
