export class Namespace {
  readonly #names: ReadonlyArray<string>;

  constructor(namespaces: ReadonlyArray<string> = []) {
    this.#names = namespaces;
  }

  extend(name: string): Namespace {
    return new Namespace([...this.#names, name]);
  }

  toString(): string {
    return this.#names.length === 0 ? "global" : this.#names.join(".");
  }
}
