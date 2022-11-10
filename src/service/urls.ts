import url, { parse } from "url";
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
    throw new Error(e);
  }
}

export function getDetailsFromPath(pathName: string) {
  const paramRoute = /:[A-Za-z]*/g;
  const matches = [...pathName.matchAll(paramRoute)];
  const params = matches.map((val) => val[0].slice(1));
  const pathRegexp = pathName.replaceAll(/:[A-Za-z]*/g, ".*");
  return { params, pathRegexp };
}

export function getCleanUrl(url: string) {
  const splitted1 = url.split("#");
  const splitted = splitted1[0].split("?");
  return splitted[0];
}

export function getRegexForUrl(url: string) {
  const { pathname } = parse(url);
  const { pathRegexp } = getDetailsFromPath(pathname);
  const regexString = getCleanUrl(url).replace(pathname, pathRegexp);
  const regex = new RegExp(`^${regexString}$`, "m");
  return regex;
}
