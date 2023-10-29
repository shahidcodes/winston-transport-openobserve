<h1 align="center">Welcome to winston-transport-openobserve 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/winston-transport-openobserve" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/winston-transport-openobserve.svg">
  </a>
  <a href="https://openobserve.ai/docs" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Winston transport for openobserve.ai

### 🏠 [Homepage](https://openobserve.ai/)

### ✨ [Demo](https://openobserve.ai/)

## Install

```sh
npm install winston-transport-openobserve
```

## Usage

```javascript
const transport = new OpenObserveTransport({
  node: "https://api.openobserve.ai",
  organization: "test",
  stream: "default",
  auth: {
    username: "user@gmail.com",
    password: "pwd",
  },
});

const logger = winston.createLogger({
  transports: [new winston.transports.Console(), transport],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  level: "debug",
});

logger.info("Hello world");
```

## Author

👤 **Shahid Kamal**

- Website: https://shahid.codes
- Github: [@shahidcodes](https://github.com/shahidcodes)

## Show your support

Give a ⭐️ if this project helped you!
