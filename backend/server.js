// Create express app
const express = require('express');

const app = express();

// import path
const path = require('path');

const cors = require('cors');
require('dotenv').config({ path: './config.env' });

// configure the app to handle JSON and to parse request body
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// tell express to use cors
app.use(cors({ credentials: true, origin: true }));

// get driver connection
const dbo = require('./dbOperations');
// declare the database object
let db;

// MongoDB URL
const url = process.env.ATLAS_URI;

// tell express where to find static files
app.use(express.static(path.join(__dirname, '../webapp/build')));

// login page - logged in successfully
app.get('/login/:name/:password', async (req, resp) => {
  if (!req.params.name || req.params.name.length === 0 || !req.params.password) {
    resp.status(404).json({ error: 'username or password not provided' });
    return;
  }
  try {
    const result = await dbo.getLoginTrue(db, req.params.name, req.params.password);
    resp.status(200).json({ data: result });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

// login page - check if password is incorrect
app.get('/lockout/:name/:password', async (req, resp) => {
  if (!req.params.name || req.params.name.length === 0 || !req.params.password) {
    resp.status(404).json({ error: 'username or password not provided' });
    return;
  }

  try {
    const result = await dbo.getPasswordTrue(db, req.params.name, req.params.password);
    resp.status(200).json({ data: result });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

// profile page - changePrivacy endpoint(change the user's privacy in db)
app.put('/user/:name/privacy', async (req, resp) => {
  if (!req.params.name || req.params.name.length === 0 || !req.body.privacy) {
    resp.status(404).json({ error: 'username or privacy setting not provided' });
    return;
  }

  try {
    const results = await dbo.changePrivacy(db, req.params.name, req.body.privacy);
    resp.status(200).json({ message: `Player with name ${results.name} changed privacy to ${results.privacy}` });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

// profile page - getHelpPosts endpoint(get the help board of posts)
app.get('/help', async (_req, resp) => {
  try {
    const results = await dbo.getHelpPosts(db);
    // console.log(results);
    resp.status(200).json({ data: results });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// request page - post request in Help db
app.post('/request/:name/:post', async (req, resp) => {
  if (!req.params.name || req.params.name.length === 0) {
    resp.status(404).json({ error: 'username not provided' });
    return;
  }
  try {
    await dbo.postRequest(db, req.params.name, req.params.post);
    resp.status(200).json({ data: 'done' });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

// signin page - addUser
app.post('/user/:name/:street/:state/:country/:zip/:password/:privacy', async (req, resp) => {
  if (!req.params.name) {
    resp.status(404).json({ error: 'username not provided' });
    return;
  }

  try {
    const results = await dbo.addUser(
      db,
      req.params.name,
      req.params.street,
      req.params.state,
      req.params.country,
      req.params.zip,
      req.params.password,
      req.params.privacy,
      req.body.date,
      req.body.helpedNo,
      req.body.requestsNo,
    );
    resp.status(200).json({ data: results });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

app.put('/change-pwd/:name', async (req, resp) => {
  if (!req.params.name || req.params.name.length === 0 || !req.body.password) {
    resp.status(404).json({ error: 'no username or password provided' });
    return;
  }

  try {
    const results = await dbo.changePassword(db, req.params.name, req.body.password);
    resp.status(200).json({ message: `Player with name ${results.name} changed password to ${results.password}` });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

// increment number of requests made
app.put('/requests/:name', async (req, resp) => {
  if (!req.params.name || req.params.name.length === 0) {
    resp.status(404).json({ error: 'no username provided' });
    return;
  }

  try {
    const results = await dbo.incrementRequest(db, req.params.name);
    resp.status(200).json({ message: `Player with name ${results.name} incremented number of requests to ${results.requestsNo}` });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

// find help posts of user
app.get('/help/:name', async (req, resp) => {
  if (!req.params.name || req.params.name.length === 0) {
    resp.status(404).json({ error: 'no username provided' });
    return;
  }

  try {
    const results = await dbo.getSpecificHelp(db, req.params.name);
    resp.status(200).json({ data: results });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

app.put('/help/:name/:message/:helper', async (req, resp) => {
  if (!req.params.name || req.params.name.length === 0) {
    resp.status(404).json({ error: 'no username provided' });
    return;
  }

  try {
    // eslint-disable-next-line max-len
    const results = await dbo.deleteHelp(db, req.params.name, req.params.message, req.params.helper);
    resp.status(200).json({ data: results });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

// accounts page - getProfile
app.get('/user/:name', async (req, resp) => {
  if (!req.params.name) {
    resp.status(404).json({ error: 'username not provided' });
    return;
  }

  try {
    const results = await dbo.getProfile(db, req.params.name);
    resp.status(200).json({ data: results });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

app.put('/message/:name1/:name2/:message/:time', async (req, resp) => {
  if (!req.params.name1) {
    resp.status(404).json({ error: 'username not provided' });
    return;
  }

  try {
    const results = await dbo.addMessage(
      db,
      req.params.name1,
      req.params.name2,
      req.params.message,
      req.params.time,
    );
    resp.status(200).json({ data: results });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

app.get('/message/:name1/:name2', async (req, resp) => {
  if (!req.params.name1) {
    resp.status(404).json({ error: 'username not provided' });
    return;
  }

  try {
    const results = await dbo.getMessages(
      db,
      req.params.name1,
      req.params.name2,
    );
    resp.status(200).json({ data: results });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

app.get('/message/:name1/', async (req, resp) => {
  if (!req.params.name1) {
    resp.status(404).json({ error: 'username not provided' });
    return;
  }

  try {
    const results = await dbo.soloGetMessages(
      db,
      req.params.name1,
    );
    resp.status(200).json({ data: results });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

// wildcard endpoint - send react app
app.get('*', (_req, resp) => {
  resp.sendFile(path.join(__dirname, '../webapp/build/index.html'));
});

// Start server
const port = process.env.PORT || 11000;
app.listen(port, async () => {
  // perform a database connection when server starts
  db = await dbo.connect(url);
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
