const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const authCtrl = require('../controllers/auth');

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.put('/modify', auth, multer, authCtrl.modify);
router.delete('/delete', auth, authCtrl.delete);

module.exports = router;