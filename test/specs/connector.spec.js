/* global describe it */
/* eslint no-unused-expressions: 0 */
const { expect } = require('chai')
const CherrySequelizeConnector = require('../../src/connector')

describe('CherrySequelizeConnector class', () => {
  const connector = new CherrySequelizeConnector()
  const connector2 = new CherrySequelizeConnector()

  it('Test the identifier constant', () => {
    expect(CherrySequelizeConnector.getIdentifier()).to.be.equal('DatabaseEngine')
  })

  it('Test the checkOptions method', () => {
    expect(() => connector.checkOptions({
      host: 'test',
      port: 'test',
      username: 'test',
      password: 'test',
      database: 'test',
      sync: 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      dialect: 'test',
      port: 'test',
      username: 'test',
      password: 'test',
      database: 'test',
      sync: 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      dialect: 'test',
      host: 'test',
      username: 'test',
      password: 'test',
      database: 'test',
      sync: 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      dialect: 'test',
      host: 'test',
      port: 'test',
      password: 'test',
      database: 'test',
      sync: 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      dialect: 'test',
      host: 'test',
      port: 'test',
      username: 'test',
      database: 'test',
      sync: 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      dialect: 'test',
      host: 'test',
      port: 'test',
      username: 'test',
      password: 'test',
      sync: 'test'
    })).to.throw()
    expect(() => connector.checkOptions({
      dialect: 'test',
      host: 'test',
      port: 'test',
      username: 'test',
      password: 'test',
      database: 'test'
    })).to.throw()
    expect(() => connector.checkOptions([{
      dialect: 'test',
      host: 'test',
      port: 'test',
      username: 'test',
      password: 'test',
      database: 'test'
    }])).to.throw()
    expect(() => connector.checkOptions({
      dialect: 'mysql',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: '',
      database: 'test_database',
      sync: false
    })).to.not.throw()

    connector2.checkOptions({
      dialect: 'mysql',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: '',
      database: 'test_database',
      sync: false,
      postConnectionProcess: () => {
        return 2
      }
    })
  })

  it('Test the connectDatabase method', async () => {
    try {
      return connector.connectDatabase()
    } catch (error) {
      return Promise.reject(error.message)
    }
  })

  it('Test the postConnectionProcess method', async () => {
    const defaultResult = await connector.postConnectionProcess()
    const defaultResult2 = await connector2.postConnectionProcess()

    expect(defaultResult).to.be.equal(1)
    expect(defaultResult2).to.be.equal(2)
  })

  it('Test the getConnection method', () => {
    expect(connector.getConnection()).to.not.be.equal(null)
  })

  it('Test the closeConnection method', async () => {
    return connector.closeConnection()
  })
})
