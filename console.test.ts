import { Console, GlobalConsole } from "./console";
import { Logger } from "./logger";

class GlobalConsoleStub implements GlobalConsole {
  readonly logs: Array<{ readonly type: string; data: unknown }> = [];

  debug(...data: unknown[]): void {
    this.logs.push({ type: "debug", data });
  }

  error(...data: unknown[]): void {
    this.logs.push({ type: "error", data });
  }

  info(...data: unknown[]): void {
    this.logs.push({ type: "info", data });
  }

  log(...data: unknown[]): void {
    this.logs.push({ type: "log", data });
  }

  warn(...data: unknown[]): void {
    this.logs.push({ type: "warn", data });
  }
}

type TestCase = [
  name: string,
  parameters: ReadonlyArray<any>,
  logs: ReadonlyArray<{ type: string; data: unknown }>
];

function createTestCases(
  type: string,
  namespace: string = "global"
): ReadonlyArray<TestCase> {
  let ns = `[${namespace}]`;
  return [
    ["zero argument", [], [{ type, data: [ns] }]],
    ["message", ["message"], [{ type, data: [ns, "message"] }]],
    [
      "message and parameters",
      ["message", { foo: 1, bar: 2 }],
      [{ type, data: [ns, "message", { foo: 1, bar: 2 }] }],
    ],
    [
      "object",
      [{ foo: 1, bar: 2 }],
      [{ type, data: [ns, { foo: 1, bar: 2 }] }],
    ],
    [
      "error object",
      [new Error("message")],
      [{ type, data: [ns, new Error("message")] }],
    ],
  ];
}

let stub: GlobalConsoleStub;
let logger: Logger;

beforeEach(() => {
  stub = new GlobalConsoleStub();
  logger = new Console({ console: stub });
});

describe("error", () => {
  test.each(createTestCases("error"))("%s", (_, parameters, logs) => {
    logger.error(...parameters);
    expect(stub.logs).toEqual(logs);
  });
});

describe("warn", () => {
  test.each(createTestCases("warn"))("%s", (_, parameters, logs) => {
    logger.warn(...parameters);
    expect(stub.logs).toEqual(logs);
  });
});

describe("info", () => {
  test.each(createTestCases("info"))("%s", (_, parameters, logs) => {
    logger.info(...parameters);
    expect(stub.logs).toEqual(logs);
  });
});

describe("log", () => {
  test.each(createTestCases("log"))("%s", (_, parameters, logs) => {
    logger.log(...parameters);
    expect(stub.logs).toEqual(logs);
  });
});

describe("debug", () => {
  test.each(createTestCases("debug"))("%s", (_, parameters, logs) => {
    logger.debug(...parameters);
    expect(stub.logs).toEqual(logs);
  });
});

describe("extend", () => {
  test.each(createTestCases("info", "foo.bar"))("%s", (_, parameters, logs) => {
    logger = logger.extend("foo").extend("bar");
    logger.info(...parameters);
    expect(stub.logs).toEqual(logs);
  });
});
