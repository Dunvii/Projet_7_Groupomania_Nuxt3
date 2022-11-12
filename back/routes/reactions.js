const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const reactionsCtrl = require('../controllers/reactions');

router.post('/:id', auth, reactionsCtrl.reactionSystem);


module.exports = router;