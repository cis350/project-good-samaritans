// import supertest
const request = require('supertest');

// import our web app
const app = require('./server');

// import database operations
const dbLib = require('./dbOperations');

// import environment variables
require('dotenv').config({ path: './config.env' });

// declare the database object
let db;

// MongoDB URL
const url = process.env.ATLAS_URI;

beforeAll(async () => {
  app.listen();
  db = await dbLib.connect(url);
  const date = {
    year: 2022,
    month: 5,
    day: 7,
  };
  await dbLib.addUser(db, 'testUser', '123 Panda St.', 'NV', 'USA', '89138', 'testPwd', 'Private', date, 0, 0);
  await dbLib.postRequest(db, 'testUser', 'help test');
  await dbLib.addUser(db, 'testUser100', '123 Panda St.', 'NV', 'USA', '89138', 'testPwd100', 'Private', date, 0, 0);
  await dbLib.postRequest(db, 'testUser100', 'help');
  await dbLib.addMessage(db, 'testUser', 'testUser100', 'hola', '100000');
});

describe('/login/:name/:password endpoint tests', () => {
  test('/login/:name/:password status code 200', () => request(app).get('/login/testUser/testPwd').send()
    .expect(200));
});

describe('/lockout/:name/:password endpoint tests', () => {
  test('/lockout/:name/:password status code 200', () => request(app).get('/lockout/testUser/falsePwd').send()
    .expect(200));
});

describe('/user/:name/privacy endpoint tests', () => {
  test('/user/:name/privacy status code 200', () => request(app).put('/user/testUser/privacy').send({ privacy: 'Public' })
    .expect(200)
    .then((response) => {
      expect(JSON.parse(response.text).message).toContain('changed privacy to');
    }));

  test('/user/:name/privacy status code 404', () => request(app).put('/user/testUser/privacy').send()
    .expect(404)
    .then((response) => {
      expect(JSON.parse(response.text).error).toBe('username or privacy setting not provided');
    }));
});

describe('/help endpoint tests', () => {
  test('/help status code 200', () => request(app).get('/help').send()
    .expect(200));
});

describe('/request/:name/:post endpoint tests', () => {
  test('/request/:name/:post status code 200', () => request(app).post('/request/testUser/help').send()
    .expect(200));
});

describe('/user/:name/:street/:state/:country/:zip/:password/:privacy endpoint tests', () => {
  const testDate = {
    year: 2022,
    month: 'May',
    day: 7,
  };
  test('/user/:name/:street/:state/:country/:zip/:password/:privacy status code 200', () => request(app).post('/user/testUser2/testStreet/testState/testCountry/123/testPwd2/Private').send({ date: testDate, helpedNo: 0, requestsNo: 0 })
    .expect(200));
});

describe('/change-pwd/:name endpoint tests', () => {
  test('/change-pwd/:name status code 200', () => request(app).put('/change-pwd/testUser').send({ password: 'changedPwd' })
    .expect(200)
    .then((response) => {
      expect(JSON.parse(response.text).message).toContain('changed password to');
    }));

  test('/change-pwd/:name status code 404', () => request(app).put('/change-pwd/testUser').send({ password: null })
    .expect(404)
    .then((response) => {
      expect(JSON.parse(response.text).error).toBe('no username or password provided');
    }));
});

describe('/requests/:name endpoint tests', () => {
  test('/requests/:name status code 200', () => request(app).put('/requests/testUser').send()
    .expect(200)
    .then((response) => {
      expect(JSON.parse(response.text).message).toContain('incremented number of requests to');
    }));

  test('/requests/:name status code 400', () => request(app).put('/requests/:name').send()
    .expect(400)
    .then((response) => {
      expect(JSON.parse(response.text).error).toBe('try again later');
    }));
});

describe('/help/:name endpoint tests', () => {
  test('/help/:name status code 200', () => request(app).get('/help/testUser').send()
    .expect(200));
});

describe('/help/:name/:message/:helper endpoint tests', () => {
  test('/help/:name/:message/:helper status code 200', () => request(app).put('/help/testUser100/help/testUser').send()
    .expect(200));
});

describe('/user/:name endpoint tests', () => {
  test('/user/:name status code 200', () => request(app).get('/user/testUser').send()
    .expect(200));
});

describe('/message/:name1/:name2/:message/:time endpoint tests', () => {
  test('/message/:name1/:name2/:message/:time status code 200', () => request(app).put('/message/testUser/testUser100/hi/100000').send()
    .expect(200));
});

describe('/message/:name1/:name2 endpoint tests', () => {
  test('/message/:name1/:name2 status code 200', () => request(app).get('/message/testUser/testUser100').send()
    .expect(200));
});

describe('/message/:name1 endpoint tests', () => {
  test('/message/:name1 status code 200', () => request(app).get('/message/testUser').send()
    .expect(200));
});
