const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const commentsCtrl = require('../controllers/comments');

router.get('/one/:id', auth, commentsCtrl.getOneComment);
router.get('/:id', auth, commentsCtrl.getAllCommentsOfPost);
router.post('/:id', auth, commentsCtrl.newComment);
router.put('/:id', auth, commentsCtrl.modifyComment);
router.delete('/:id', auth, commentsCtrl.deleteComment);

module.exports = router;