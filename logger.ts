export interface Logger {
  error: Log;
  warn: Log;
  info: Log;
  debug: Log;
  log: Log;

  extend(name: string): Logger;
}

export type Log = {
  (message: string, parameters?: object): void;

  (record: object): void;

  (...args: unknown[]): void;
};
