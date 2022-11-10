import React, { useReducer } from "react";
import Container from "../components/container/container";
import UrlForm from "../components/forms/url";
import { Mock } from "../models/db.model";
import dbInstance from "../service/db";
import { getDetailsFromPath, getRegexForUrl, parseUrl } from "../service/urls";

export const requestValues = {
  GET: null,
  POST: null,
  PUT: null,
  PATCH: null,
  DELETE: null,
};

export interface StateProps {
  request: keyof typeof requestValues;
  url: string;
}

const initialValue = {
  request: "GET",
  url: "",
} as StateProps;

const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case "URL": {
      return {
        ...state,
        url: action.payload,
      };
    }
    case "REQUEST": {
      return {
        ...state,
        request: action.payload,
      };
    }
  }
  return state;
};

export default function Main() {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const { request, url } = state;
  const onSubmit = async () => {
    const { host, queries, pathname } = parseUrl(url);
    const queriesArray = Object.keys(queries);
    const pathRegex = getRegexForUrl(url);
    const { params } = getDetailsFromPath(pathname);
    const mock = {
      path: pathRegex,
      queries: queriesArray,
      params,
    } as Mock;
    await dbInstance.addMockData(host, mock);
  };
  return (
    <Container>
      <UrlForm
        request={request}
        url={url}
        dispatch={dispatch}
        onSubmit={onSubmit}
      />
    </Container>
  );
}
