const router = require('express').Router();
const controlloer = require('./book.controller');

router.post('/BookWrite', controlloer.BookWrite);
router.get('/BookAll', controlloer.BookAll);
router.get('/BookRead/:title', controlloer.BookRead);

module.exports = router;