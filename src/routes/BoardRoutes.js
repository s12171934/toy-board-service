const express = require('express');
const router = express.Router();
const boardController = require('../controllers/BoardController');

router.post('/', boardController.createBoard);
router.get('/:id', boardController.getBoardById);

module.exports = router;