/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Type, conn } = require('../../src/db.js');

const agent = session(app);



describe('Types routes', () => {

  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Type.sync({ force: true }))
  describe('GET /types', () => {
    it('should get 200', async() =>{
       let response = await agent.get('/types')
       expect(response.status).to.eql(200)
      }
    );
    it('should return all types', async() => {
      let response = await agent.get('/types')
      expect(response.body).to.be.an('array').that.have.lengthOf(20)
    });

  });
});
