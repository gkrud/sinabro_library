const router = require('express').Router();
const controlloer = require('./auth.controller');
const auth_middleware = require('../../../middlewares/auth');

router.post('/register', controlloer.register);
router.post('/config', controlloer.config);
router.post('/login', controlloer.login);

router.use('/check', auth_middleware);
router.get('/check', controlloer.check);

module.exports = router;