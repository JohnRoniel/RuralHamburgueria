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
    res.render('inventory/new', {
      title: 'Novo Produto',
      layout: 'layout'
    });
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

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

router.post('/', async (req, res) => {
  try {
    const { name, category, count, control, countMin } = req.body;

    const newInventory = new Inventory({
      name,
      category,
      count,
      control,
      countMin
    });

    await newInventory.save();
    res.redirect('/inventory');
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

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

router.get('/getItemsLow', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    const inventoryLow = inventory.filter(item => item.count < item.countMin);

    res.render('inventory/index', {
      inventory: inventoryLow,
      title: 'Produtos com estoque baixo',
      layout: 'layout'
    });
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

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


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, count, control, countMin } = req.body;

    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      { name, category, count, control, countMin },
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