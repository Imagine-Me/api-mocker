import { Request } from "xhook";

const requestValues = {
  GET: null,
  POST: null,
  PUT: null,
  PATCH: null,
  DELETE: null,
};

export type RequestMethod = keyof typeof requestValues;

export const requestMethods = Object.keys(requestValues);
