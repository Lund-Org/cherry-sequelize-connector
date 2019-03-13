# Cherry Sequelize Connector

[![Build Status](https://travis-ci.com/Lund-Org/cherry-sequelize-connector.svg?branch=master)](https://travis-ci.com/Lund-Org/cherry-sequelize-connector)

A plugin to use [Sequelize](https://github.com/sequelize/sequelize) as the orm in cherry 🍒

## Installation

Use the package manager [npm](http://npmjs.com) to install Cherry Sequelize Connector.

```bash
npm install @lund-org/cherry-sequelize-connector
```

To start the tests, a [docker](https://docker.com)-compose is available.

```bash
docker-compose.exe -f etc/docker-compose.yml up -d
```

## Usage

Checkout the example in the [example folder of cherry](https://github.com/Lund-Org/cherry/tree/master/example/04-orm/).
Of course, you need a cherry app to use this connector :

```javascript
const Cherry = require('@lund-org/cherry')
const CherryPugConnector = require('@lund-org/cherry-sequelize-connector')

const cherry = new Cherry()
cherry.configure(routes, [], options) // TO UPDATE WHEN REFACTO IS DONE
// The following line is the important one
cherry.registerPlugin(CherryPugConnector)
cherry.start(options)
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/Lund-Org/cherry-sequelize-connector/blob/master/LICENSE)
