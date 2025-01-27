const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('generator');
});

router.get('/details', async (req, res) => {
  res.redirect('https://chat.whatsapp.com/FAFCH7Vd6vAL4UFTZOXah6');
});

module.exports = router;