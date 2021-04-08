import { Logger } from "./logger";
import { Namespace } from "./namespace";

/**
 * @private
 */
export class Console implements Logger {
  readonly #namespace: Namespace;
  readonly #console: GlobalConsole;

  constructor(options?: Options) {
    this.#namespace = options?.namespace ?? new Namespace();
    this.#console = options?.console ?? global.console;
  }

  error(...args: unknown[]): void {
    this.#console.error(this.namespace, ...args);
  }

  warn(...args: unknown[]): void {
    this.#console.warn(this.namespace, ...args);
  }

  info(...args: unknown[]): void {
    this.#console.info(this.namespace, ...args);
  }

  log(...args: unknown[]): void {
    this.#console.log(this.namespace, ...args);
  }

  debug(...args: unknown[]): void {
    this.#console.debug(this.namespace, ...args);
  }

  extend(name: string): Logger {
    return new Console({
      namespace: this.#namespace.extend(name),
      console: this.#console,
    });
  }

  private get namespace(): string {
    return `[${this.#namespace}]`;
  }
}

/**
 * @private
 */
export type Options = {
  readonly namespace?: Namespace;
  readonly console?: GlobalConsole;
};

/**
 * @private
 */
export type GlobalConsole = Pick<
  typeof global.console,
  "error" | "warn" | "info" | "log" | "debug"
>;

export const console: Logger = new Console();
