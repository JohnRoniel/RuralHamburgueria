const express = require('express');
const router = express.Router();
const { getDb } = require('../config/database');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const products = await db.collection('products')
      .aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category'
          }
        },
        {
          $unwind: {
            path: '$category',
            preserveNullAndEmptyArrays: true
          }
        }
      ]).toArray();

    res.render('products/index', {
      products,
      title: 'Produtos',
      layout: 'layout'
    });
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

router.get('/new', async (req, res) => {
  try {
    const db = getDb();
    const categories = await db.collection('categories').find().toArray();
    res.render('products/new', { 
      categories,
      title: 'Novo Produto',
      layout: 'layout'
    });
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const { name, description, price, quantity, category_id } = req.body;
    await db.collection('products').insertOne({
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category_id: new ObjectId(category_id),
      created_at: new Date(),
      updated_at: new Date()
    });

    res.redirect('/products');
  } catch (error) {
    res.status(500).render('error', { error, layout: 'layout' });
  }
});

module.exports = router;