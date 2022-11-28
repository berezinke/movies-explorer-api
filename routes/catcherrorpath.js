const router = require('express').Router();

const {
  errorPath,
} = require('../controllers/errorcatch');

router.all('/*', errorPath);

module.exports = router;
