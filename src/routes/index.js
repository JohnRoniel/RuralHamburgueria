const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', {
    title: 'Sistema de Gestão Rural Hamburgueria'
  });
});

module.exports = router;