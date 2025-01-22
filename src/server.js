//Config ENV 
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('node:path');
const methodOverride = require('method-override');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const database = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
database();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'inventory-secret',
  resave: false,
  saveUninitialized: true
}));


// Setup express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Global middleware to set default locals
app.use((req, res, next) => {
  res.locals.title = 'Sistema de Gestão Rural Hamburgueria';
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/inventory', require('./routes/inventory'));

app.listen(PORT, () => {
  console.log(`--- Server running on port ${PORT}`);
});