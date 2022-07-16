const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>
   res.render('signin', { layout: 'main', title: 'Sign In' })
);

module.exports = router