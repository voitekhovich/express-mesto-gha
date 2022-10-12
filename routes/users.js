const router = require('express').Router();
const {
  getUsers, getUserById, createUser, patchUsersMe, patchUsersMeAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', patchUsersMe);
router.patch('/me/avatar', patchUsersMeAvatar);

module.exports = router;
