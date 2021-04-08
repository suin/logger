import { Logger } from "./logger";

class MuteLogger implements Logger {
  debug() {
    // do nothing
  }

  error() {
    // do nothing
  }

  info() {
    // do nothing
  }

  log() {
    // do nothing
  }

  warn() {
    // do nothing
  }

  extend(_: string): Logger {
    return this;
  }
}

export const muteLogger: Logger = new MuteLogger();
