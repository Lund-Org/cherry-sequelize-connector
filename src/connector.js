const Sequelize = require('sequelize')

/**
 * The connector to use Sequelize with cherry
 * You can register it as a plugin using this following code
 * @example
 * const Cherry = require('@lundOrg/cherry')
 * const CherrySequelizeConnector = require('@lundOrg/cherry-sequelize-connector')
 *
 * const cherry = new Cherry()
 * // cherry.configure(your_routes, [], your_options) <= TO UPDATE LATER
 * cherry.registerPlugin(CherrySequelizeConnector)
 * cherry.start(options)
 */
class CherrySequelizeConnector {
  /**
   * The connector to use Typeorm with cherry
   */
  constructor () {
    this.connection = null
    this.options = {}
  }

  /**
   * Get the type of plugin
   * @return {string}
   */
  static getIdentifier () {
    return 'DatabaseEngine'
  }

  /**
   * Check if there are at least the minimum options required
   * @param {object} options The options to connect to the database
   */
  checkOptions (options) {
    if (Array.isArray(options)) {
      throw new Error(`Sequelize doesn't manage the multiconnection with only one object. If you want to use a multiconnection, take a look at Typeorm`)
    } else {
      [
        'dialect',
        'host',
        'port',
        'username',
        'password',
        'database',
        'sync'
      ].forEach((key) => {
        if (typeof options[key] === 'undefined' || options[key] === null) {
          throw new Error(`The parameter ${key} is required in the database options for Sequelize`)
        }
      })
    }
    this.options = options
  }

  /**
   * Connect to the database
   */
  async connectDatabase () {
    this.connection = new Sequelize(this.options)
    return this.connection.authenticate()
  }

  /**
   * Post actions after the connection
   * VERY required for Sequelize because we can't register our models and tables, etc before the connection of the database
   * @return {Promise}
   */
  async postConnectionProcess () {
    if (this.options.postConnectionProcess) {
      return this.options.postConnectionProcess(this.connection, this.options)
    }

    return Promise.resolve(1)
  }

  /**
   * Retrieve the Sequelize connection
   * @return {Object}
   */
  getConnection () {
    return this.connection
  }

  /**
   * Disconnect the database
   * @return {Promise}
   */
  async closeConnection () {
    return this.connection.close()
  }
}

module.exports = CherrySequelizeConnector
