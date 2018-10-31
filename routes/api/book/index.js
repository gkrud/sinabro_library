const router = require('express').Router();
const controller = require('./book.controller');

router.post('/BookWrite', controller.BookWrite);
router.get('/BookAll', controller.BookAll);
router.get('/BookRead/:title', controller.BookRead);
router.patch('/BookUpdate/:title/:new', controller.BookUpdate);
router.delete('/BookDelete/:title', controller.BookDelete);

module.exports = router;