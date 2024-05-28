const express = require('express');
const router = express.Router();
const boardController = require('../controllers/BoardController');

router.post('/', boardController.createBoard);

router.get('/:id', boardController.getBoardById);
router.get('/all/:page', boardController.getAllBoard);

router.put('/:id', boardController.editBoard);

router.delete('/:id', boardController.deleteBoard);

module.exports = router;