/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);


const pokemon = {
  name: 'PikachuDoss',
  image:'urldeimagen',
  hp:2,
  attack:2,
  defense:2,
  speed:2,
  height:2,
  weight:2,
};
const pokemon3 = {
  name: 'PikachuTress',
  image:'urldeimagen',
  hp:2,
  attack:2,
  defense:2,
  speed:2,
  height:2,
  weight:2,
  types:['1']
};

describe('Pokemon routes', () => {

  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', async() =>{
       let response = await agent.get('/pokemons')
       expect(response.status).to.eql(200)
      }
    );
    it('should return all pokemons', async() => {
      let response = await agent.get('/pokemons')
      expect(response.body).to.be.an('array').that.have.lengthOf.above(150)
    });
    it('should return one pokemon by name', async() => {
      let response = await agent.get('/pokemons?name=pikachu')
      expect(response.body).to.have.own.property('name')
    });
    it('should return one pokemon by id', async() => {
      let response = await agent.get('/pokemons/1')
      expect(response.body).to.have.own.property('name')
    });
    it('should return posted pokemon', async() => {
      let response = await agent.post('/pokemons').send(pokemon3)
      expect(response.status).to.eql(201)
      expect(response.body).to.have.own.property('name')
    });

  });
});
