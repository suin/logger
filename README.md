# @suin/logger

A simple logger for backend apps.

## Features

> TODO

## Installation

```bash
yarn add @suin/logger
# or
npm install @suin/logger
```

## Usage

Basic usage:

```typescript
import {Logger, muteLogger, console} from "@suin/logger";

function doSomething(logger: Logger = muteLogger) {
    logger.log("operation started");
}

doSomething(console);
```

## API Reference

https://suin.github.io/logger/
