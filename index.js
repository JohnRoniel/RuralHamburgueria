// run `node index.js` in the terminal

const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Dashboard'
  });
});

module.exports = router;

console.log(`Hello Node.js v${process.versions.node}!`);