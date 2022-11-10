import { getCleanUrl, getDetailsFromPath, getRegexForUrl, parseUrl } from "./urls";

const url1 = "http://localhost:8000/";
const url2 = "https://localhost:8000/api/data#anchor";
const url3 = "https://localhost:8000/api/data?id=1";
const url4 = "https://localhost:8000/api/data?id=1&name=johndoe#anchor";

describe("test different urls", () => {
  it("should return the correct host name", () => {
    expect(parseUrl(url1)).toMatchObject({
      host: "localhost:8000",
      pathname: "/",
      queries: {},
    });
    expect(parseUrl(url2)).toMatchObject({
      host: "localhost:8000",
      pathname: "/api/data",
      queries: {},
    });
    expect(parseUrl(url3)).toMatchObject({
      host: "localhost:8000",
      pathname: "/api/data",
      queries: { id: "1" },
    });
    expect(parseUrl(url4)).toMatchObject({
      host: "localhost:8000",
      pathname: "/api/data",
      queries: { id: "1", name: "johndoe" },
    });
  });
});

const url5 = "https://localhost:8000/api/:id?id=1&name=johndoe";
const url6 = "https://localhost:8000/api/:id/update/:token?id=1&name=johndoe";

describe("test params", () => {
  it("should return params", () => {
    const { pathname } = parseUrl(url5);
    expect(getDetailsFromPath(pathname)).toMatchObject({
      params: ["id"],
      pathRegexp: "/api/.*",
    });
    const { pathname: pathname1 } = parseUrl(url6);
    expect(getDetailsFromPath(pathname1)).toMatchObject({
      params: ["id", "token"],
      pathRegexp: "/api/.*/update/.*",
    });
  });
});

describe('test getcleanUrl',()=>{
  it('should return clean url',()=>{
    expect(getCleanUrl(url1)).toBe(url1)
    expect(getCleanUrl(url2)).toBe('https://localhost:8000/api/data')
    expect(getCleanUrl(url3)).toBe('https://localhost:8000/api/data')
    expect(getCleanUrl(url4)).toBe('https://localhost:8000/api/data')
  })
})

describe("regex for url", () => {
  it(`should return ${url1} `, () => {
    expect(getRegexForUrl(url1).test(url1)).toBe(true);
  });
  it("should return https://localhost:8000/api/.* ", () => {
    expect(getRegexForUrl(url5).test(url5)).toBe(true)
  });
  it("should return https://localhost:8000/api/.*/update/.* ", () => {
    expect(getRegexForUrl(url6).test(url6)).toBe(true);
  });
});
