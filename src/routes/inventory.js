const express = require('express');
const router = express.Router();
const Inventory = require('../model/inventoryModel');

router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find();

    res.render('inventory/index', {
      inventory,
      title: 'Produtos',
      layout: 'layout'
    });
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

router.get('/new', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.render('inventory/new', { 
      inventory,
      title: 'Novo Produto',
      layout: 'layout'
    });
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, category, count, control} = req.body;
    const newInventory = new Inventory({
      name,
      category,
      count,
      control
    });
    await newInventory.save();

    res.redirect('/inventory');
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }});

router.post('/getItems', async (req, res) => {
  try {
    const { category } = req.body;
    const inventory = await Inventory.findOne({ category });
    
    console.log(inventory);

    res.render('inventory/index', {
      inventory,
      title: 'Produtos retornados',
      layout: 'layout'
    });
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});
module.exports = router;