import url from "url";
export function parseUrl(urlString: string) {
  try {
    const parsed = url.parse(urlString);
    const { host, pathname, query } = parsed;
    let queries = {} as Record<string, string>;
    if (query) {
      queries = query.split("&").reduce((acc, q) => {
        const splitted = q.split("=");
        acc[splitted[0]] = splitted[1];
        return acc;
      }, {} as Record<string, string>);
    }
    return { host, pathname, queries };
  } catch (e) {
    console.error(e);
    return { host: null, pathname: null, queries: null };
  }
}


export function getDetailsFromPath(pathName: string) {
  const paramRoute = /:[A-Za-z]*/g;
  const abc = [...pathName.matchAll(paramRoute)];
  const params = abc.map((val) => val[0].slice(1));
  const pathRegexp = new RegExp(
    `^${pathName.replaceAll(/:[A-Za-z]*/g, ".*")}$`,
    "m"
  );
  return { params, pathRegexp };
}
