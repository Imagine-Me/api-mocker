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
      const data: Mock[] = await this.instance.getItem(hostName);
      if (data) {
        return data;
      }
      return [];
    } catch (e) {
      console.log("[db.ts][_getMocksByHostName]", e);
      throw new Error(e);
    }
  }

  async _addMocks(hostName: string, mocks: Mock[]) {
    await this.instance.setItem(hostName, mocks);
  }
  async addMockData(hostName: string, mock: Mock) {
    const mocks = await this._getMocksByHostName(hostName);
    const mockIndex = mocks.findIndex(
      (_mock) => _mock.path.toString() == mock.path.toString()
    );
    if (mockIndex !== -1) {
      mocks.splice(mockIndex, 1, mock);
    } else {
      mocks.push(mock);
    }
    await this._addMocks(hostName, mocks);
  }
}

const dbInstance = new Db();

export default dbInstance;
