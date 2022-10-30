const router = require('express').Router();
const {
  getUsers, getUserById, getUsersMe, patchUsersMe, patchUsersMeAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUsersMe);
router.get('/:userId', getUserById);
router.patch('/me', patchUsersMe);
router.patch('/me/avatar', patchUsersMeAvatar);

module.exports = router;
