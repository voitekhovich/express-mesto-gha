const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getUsers, getUserById, getUsersMe, patchUsersMe, patchUsersMeAvatar,
} = require('../controllers/users');
const { userSсhema, avatarSсhema } = require('../utils/joiSchemas');

router.get('/', getUsers);
router.get('/me', getUsersMe);
router.get('/:userId', getUserById);
router.patch('/me', celebrate(userSсhema), patchUsersMe);
router.patch('/me/avatar', celebrate(avatarSсhema), patchUsersMeAvatar);

module.exports = router;
