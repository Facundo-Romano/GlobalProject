const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('allowNull is good', () => {
      it('should throw an error if id, name, img, continent, or capital are null', () => {
        return Country.create({})
          .then(() => new Error('allowNull error'))
          .catch(error => {
            expect(error.errors[0].path).to.equal('id'),
            expect(error.errors[1].path).to.equal('name'),
            expect(error.errors[2].path).to.equal('img'),
            expect(error.errors[3].path).to.equal('continent'),
            expect(error.errors[4].path).to.equal('capital')
          });
      });
    });
    describe('type is good', () => {
      it('creates a country', async () => {
        let country = await Country.create({
          id: 0123456,
          name: 0123456,
          img: 0123456,
          continent: 0123456,
          capital: 0123456,
          subregion: 0123456,
          area: '1223',
          population: '1223'
        });
        expect(typeof country).to.equal('object')
      })
      it('every property should be its respective type', async () => {
        let country = await Country.create({
          id: 0123456,
          name: 0123456,
          img: 0123456,
          continent: 0123456,
          capital: 0123456,
          subregion: 0123456,
          area: '1223',
          population: '1223'
        });
        expect(typeof country.dataValues.id).to.equal('string');
        expect(typeof country.dataValues.name).to.equal('string');
        expect(typeof country.dataValues.img).to.equal('string');
        expect(typeof country.dataValues.continent).to.equal('string');
        expect(typeof country.dataValues.capital).to.equal('string');
        expect(typeof country.dataValues.subregion).to.equal('string');
        expect(typeof country.dataValues.area).to.equal('number');
        expect(typeof country.dataValues.population).to.equal('number');
      });
    });
  });
});

