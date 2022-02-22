/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');
const agent = session(app);



describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  describe('GET /countries', () => {
    it('should get 200', async() => {
      let data = await agent.get('/countries');
      expect(data.status).to.equal(200)
    });
    it('should get all API countries', async () => {
      let data = await agent.get('/countries');
      expect(data.body.length).to.equal(250)
    })
    it('should get the specific country', async ()=> {
      let data = await agent.get('/countries?name=Argentina')
      expect(data.body[0].name).to.equal('Argentina')
    })
  });

  describe('GET /countries/:countryId', () => {
    it('should get 200', async() => {
      let data = await agent.get('/countries/ARG');
      expect(data.status).to.equal(200)
    });
    it('should get the specific country', async () => {
      let data = await agent.get('/countries/ARG');
      expect(data.body[0].name).to.equal('Argentina')
    })
  });

  describe('POST /activity', () => {
    it('should get 200', async() => {
      let data = await agent.post('/activity').send(
        { name: 'hola', difficulty: 1, duration: 2, season: 'Winter', countries: 'ARG', img: '' }
      );
      expect(data.status).to.equal(200)
    });
    it("should fail if the data sended is wrong", async() => {
      let data = await agent.post('/activity').send({});
      expect(data.status).to.equal(404)
    });
  });

  describe('GET /activities', () => {
    it('should get 200', async() => {
      let data = await agent.get('/activities');
      expect(data.status).to.equal(200)
    });
  });
  
  describe('GET /activities/:activityId', () => {
    it('should get 200', async() => {
      let data = await agent.get('/activities/1');
      expect(typeof data.body).to.equal('object')
    });
    it("should fail if activity id doesn't exist", async() => {
      let data = await agent.get('/activities/-1');
      expect(data.status).to.equal(400)
    });
  });
});
