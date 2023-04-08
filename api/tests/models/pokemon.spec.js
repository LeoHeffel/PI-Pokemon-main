const { Pokemon,Type, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if data missing', (done) => {
        Pokemon.create({name:'nuevoPoke',  hp:2, attack:2, speed:2 })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid object', (done) => {
        Pokemon.create({name:'nuevoPoke', image:'imagen', hp:2, attack:2, defense:2, speed:2, height:2, weight:2})
        .then(() => done())
          .catch(() => done(new Error('It requires a valid name')));
      });

    });
  });

});

describe('Type model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Type.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Type.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      
      it('should work when its a valid object', (done) => {
        Type.create({name:'nuevoTipo'})
        .then(() => done())
          .catch(() => done(new Error('It requires a valid name')));
      });
    });
  });

});
