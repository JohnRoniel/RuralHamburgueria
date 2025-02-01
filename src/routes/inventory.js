const express = require('express');
const router = express.Router();
const Inventory = require('../model/InventoryModel');

/*
* GET /inventory
* get all inventory items on render index page
* @return {Array} inventory
*/
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

/*
* GET /inventory/new
* render new inventory item page
*/
router.get('/new', async (req, res) => {
  try {
    res.render('inventory/new', {
      title: 'Novo Produto',
      layout: 'layout'
    });
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

/*
* GET /inventory/getItemsAlfabetic
* get inventory items in alphabetical order
* @return {Array} inventoryAlfabetic
*/

router.get('/getItemsAlfabetic', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    const inventoryAlfabetic = inventory.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    res.render('inventory/index', {
      inventory: inventoryAlfabetic,
      title: 'Produtos em ordem alfabética',
      layout: 'layout'
    });
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

/*
* GET /inventory/getItemsLow
* get inventory items with low stock
* @return {Array} inventoryLow
*/
router.get('/getItemsLow', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    const inventoryLow = inventory.filter(item => item.count < item.countMin || item.controlState == 'LOW');

    res.render('inventory/index', {
      inventory: inventoryLow,
      title: 'Produtos com estoque baixo',
      layout: 'layout'
    });
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

/* 
* GET /inventory/edit/:id
* render edit inventory item page
* @param {String} id
* @return {Object} inventory
*/
router.get('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findById(id);

    if (!inventory) {
      return res.status(404).render('error', { error: 'Item não encontrado', layout: 'layout' });
    }

    res.render('inventory/edit', {
      inventory,
      layout: 'layout'
    });
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

/* 
* POST /inventory
* create new inventory item
* @param {String} name
* @param {String} category
* @param {Number} count
* @param {String} control
* @param {Number} countMin
*/
router.post('/', async (req, res) => {
  try {
    const { name, category, count, control, countMin, controlState } = req.body;

    const newInventory = new Inventory({
      name,
      category,
      count,
      control,
      controlState,
      countMin
    });

    await newInventory.save();
    res.redirect('/inventory');
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

/*
* POST /inventory/getItems
* get inventory items by category
* @param {String} category
* @return {Array} inventory
*/
router.post('/getItems', async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).render('error', { error: 'Categoria não informada', layout: 'layout' });
    }

    const inventory = category === 'ALL' ? await Inventory.find() : await Inventory.find({ category });

    res.render('inventory/index', {
      inventory,
      title: 'Produtos',
      layout: 'layout'
    });
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

/*
* DELETE /inventory/delete/:id
* delete inventory item by id
* @param {String} id
*/
router.delete('/delete/:id', async (req, res) => {
  try {
    console.log('ID Recebido:', req.params.id);

    const { id } = req.params;
    const result = await Inventory.findByIdAndDelete(id);

    console.log('Resultado da Exclusão:', result);

    if (!result) {
      return res.status(404).send('Item não encontrado.');
    }

    res.redirect('/inventory');
  } catch (error) {
    console.error('Erro na Exclusão:', error);
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

/*
* PUT /inventory/:id
* update inventory item by id
* @param {String} id
* @param {String} name
* @param {String} category
* @param {Number} count
* @param {String} control
* @param {Number} countMin
*/
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, count, control, countMin, controlState } = req.body;

    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      { name, category, count, control, countMin, controlState },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).render('error', { error: 'Item não encontrado', layout: 'layout' });
    }

    res.redirect('/inventory');
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

module.exports = router;