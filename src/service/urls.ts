import url from "url";

const dbData = {
  host: "datausa.io",
  pathname: "/api/data",
  queries: {
    drilldowns: "Nation",
    measures: "Population",
  },
};

export function parseUrl(urlString: string) {
  const parsed = url.parse(urlString);
  const { host, pathname, query } = parsed;
  const queries = query.split("&").reduce((acc, q) => {
    const splitted = q.split("=");
    acc[splitted[0]] = splitted[1];
    return acc;
  }, {});
  return { host, pathname, queries };
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
