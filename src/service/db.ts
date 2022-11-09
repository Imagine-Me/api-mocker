import localforage, { LOCALSTORAGE, INDEXEDDB, WEBSQL } from "localforage";
import { DbModel, Mock } from "../models/db.model";
import { getDetailsFromPath, parseUrl } from "./urls";

export class Db {
  private instance = localforage;
  constructor() {
    this.instance.config({
      driver: [INDEXEDDB, WEBSQL, LOCALSTORAGE],
      version: 1,
      description: "Database for mock items",
      name: "api-mocker",
    });
  }
  get dbInstance() {
    return this.instance;
  }
  async _getMocksByHostName(hostName: string) {
    try {
      const data = (await this.instance.getItem(hostName)) as DbModel;
      if (data) {
        return data.mocks;
      }
      return [];
    } catch (e) {
      console.log("[db.ts][_getMocksByHostName]", e);
    }
  }
  async addMockData(url: string, response?: any) {
    const { host, pathname, queries } = parseUrl(url);
    const { params, pathRegexp } = getDetailsFromPath(pathname);
    const mocks = await this._getMocksByHostName(host);
    const mock = {
      path: pathRegexp,
      params,
      queries: Object.keys(queries),
    } as Mock;
    mocks.push(mock);
  }
}
