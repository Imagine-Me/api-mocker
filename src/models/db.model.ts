export interface DbModel {
  hostName: string;
  mocks: Mock[];
}

export interface Mock {
  path: RegExp;
  queries?: string[];
  params?: string[];
  response?: MockResponse;
}

export interface MockResponse {
  status: number;
  data: Record<string, any>;
}
