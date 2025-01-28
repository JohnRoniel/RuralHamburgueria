//Config ENV 
require('dotenv').config();

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('generator');
});

router.get('/details', async (req, res) => {
  res.redirect(process.env.CASHIER_URI);
});

module.exports = router;