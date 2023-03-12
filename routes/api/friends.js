const express = require('express');
const router = express.Router();
const friendsCtrl = require('../../controllers/api/friends')

router.get('/', friendsCtrl.getAll);
router.get('/:id', friendsCtrl.show); //not sure if this should be show or not
router.post('/', friendsCtrl.create);
router.delete('/:id', friendsCtrl.delete)
router.put('/:id', friendsCtrl.update)

module.exports = router;
