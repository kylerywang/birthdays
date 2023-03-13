const express = require('express');
const router = express.Router();
const friendsCtrl = require('../../controllers/api/friends')

router.get('/', friendsCtrl.getAll);
router.post('/', friendsCtrl.create);
router.delete('/:id', friendsCtrl.delete)

module.exports = router;
