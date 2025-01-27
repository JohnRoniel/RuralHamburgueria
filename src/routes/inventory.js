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

router.get('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findOne({ _id: id });
    
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
      countMin,
      category,
      count,
      control
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
      const inventory = await Inventory.find({ category }); // alterado para find, retornando múltiplos itens
  
      res.render('inventory/index', {
        inventory,
        title: 'Produtos retornados',
        layout: 'layout'
      });
    } catch (error) {
      res.status(500).render('error', { error, layout: 'layout' });
    }
  });
  

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Inventory.deleteOne({ _id: id });

    res.redirect('/inventory');
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, count, control, countMin } = req.body;

    // Usando findByIdAndUpdate para atualizar ou retornar erro caso não encontre
    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      { name, category, count, control, countMin },
      { new: true, runValidators: true } // `new: true` retorna o documento atualizado
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