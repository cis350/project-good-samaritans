// Create express app
const express = require('express');
const app = express();

const cors = require('cors');
require("dotenv").config({ path: "./config.env" });


// configure the app to handle JSON and to parse request body
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// tell express to use cors
app.use(cors({ credentials: true, origin: true}));

// get driver connection
const dbo = require("./dbOperations");
// declare the database object
let db;

// MongoDB URL
const url;

// profile page - changePrivacy endpoint(change the user's privacy in db)
app.put('/user/:name/privacy', async (req, resp) => {
  if (!req.params.user || req.params.user.length === 0 || !req.body.privacy) {
    resp.status(404).json({ error: 'username or privacy setting not provided' });
    return;
  }

  try {
    const results = await dbo.changePrivacy(db, req.params.user, req.body.privacy);
    resp.status(200).json({ message: `Player with name ${results.user} changed privacy to ${results.privacy}` });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

// profile page - getFriends endpoint(get the user's friends)
app.get('/friends/:name', async (req, resp) => {
  if (!req.params.name || req.params.name.length === 0) {
    resp.status(404).json({ error: 'username not provided' });
    return;
  }

  try {
    const results = await dbo.getFriends(db, req.params.name);
    resp.status(200).json({ data: results });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

// profile page - getHelpPosts endpoint(get the help board of posts)
app.get('/help-posts', async (_req, resp) => {
  try {
    const results = await dbo.getHelpPosts(db);
    resp.status(200).json({ data: results });
  } catch (err) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// profile page - getSamaritanTexts endpoint(find who the user is currently helping/texting)
app.get('/samaritan/:name', async (req, resp) => {
  if (!req.params.name || req.params.name.length === 0) {
    resp.status(404).json({ error: 'username not provided' });
    return;
  }

  try {
    const results = await dbo.getSamaritanTexts(db, req.params.name);
    resp.status(200).json({ data: results });
  } catch (err) {
    resp.status(400).json({ error: 'try again later' });
  }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, async () => {
  // perform a database connection when server starts
  // dbo.connectToServer(function (err) {
  //   if (err) console.error(err);
 
  // });
  db = await dbo.connect(url);
  console.log(`Server is running on port: ${port}`);
});