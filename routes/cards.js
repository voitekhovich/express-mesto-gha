const router = require('express').Router();
const {
  getCards, createCard, delCardById, putCardLike, delCardLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', delCardById);
router.put('/:cardId/likes', putCardLike);
router.delete('/:cardId/likes', delCardLike);

module.exports = router;
