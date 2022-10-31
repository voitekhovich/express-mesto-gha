const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../utils/errors/NotFoundError');

router.post('/signin', login);
router.post('/signup', createUser);

router.use(cookieParser());
router.use(auth);

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', () => {
  throw new NotFoundError('Был запрошен несуществующий роут');
});

module.exports = router;
