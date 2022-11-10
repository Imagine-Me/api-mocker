import { parseUrl } from "./urls";

const url1 = "http://localhost:8000/";
const url2 = "https://localhost:8000/api/data#anchor";
const url3 = "https://localhost:8000/api/data?id=1";
const url4 = "https://localhost:8000/api/data?id=1&name=johndoe";

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
