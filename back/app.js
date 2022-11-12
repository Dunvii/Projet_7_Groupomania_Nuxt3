const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const Auth = require('./routes/auth');
const Posts = require('./routes/posts');
const Comments = require('./routes/comments');
const Reactions = require('./routes/reactions');
const app = express();
const path = require('path');

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', Auth);
app.use('/api/posts', Posts);
app.use('/api/comments', Comments);
app.use('/api/reactions', Reactions);

module.exports = app;