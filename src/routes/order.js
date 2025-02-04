
const express = require('express');
const router = express.Router();
const Inventory = require('../model/InventoryModel');
router.post('/addToOrder', async (req, res) => {
    try {
        const { selectedProducts } = req.body;

        if (!selectedProducts) {
            return res.status(400).json({ message: 'Nenhum produto selecionado.' });
        }

        const productsArray = Array.isArray(selectedProducts) ? selectedProducts : [selectedProducts];

        const inventorySearch = async (id) => {
            return await Inventory.findById(id);
        };

        const hoje = new Date();
        const proximoDia = new Date();
        proximoDia.setDate(hoje.getDate() + 1);

        const countOrState = (item) => {
            if (item.controlState == 'DISABLE') {
                return item.count + item.control;
            } else {
                return item.controlState;
            }
        };

        const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const diaDaSemana = diasDaSemana[hoje.getDay()];

        const formatarData = (data) =>
            data.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });

        // Buscar todos os produtos assíncronos
        const products = await Promise.all(productsArray.map(async (id) => {
            const product = await inventorySearch(id);
            return `- ${product.name} (Estoque: ${countOrState(product)}${product.controlState == "DISABLE" ? `/ Min: ${product.countMin + product.control}` : ''})`;
        }));

        const pedido =
            `----- PEDIDO DE ABASTECIMENTO -----
Data: ${formatarData(hoje) + ' ' + diaDaSemana}
Para: ${formatarData(proximoDia)}\n\n${products.join('\n')}`;

        res.redirect('https://wa.me/?text=' + encodeURIComponent(pedido));
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar pedido' });
    }
});


/*
router.get('/send', async (req, res) => {
    try {
        const inventory = await Inventory.find();
        const data = inventory.filter(item => item.count < item.countMin || item.controlState == 'BAIXO');

        const countOrState = (item) => {
            if (item.controlState == 'DISABLE') {
                return item.count + item.control;
            } else {
                return item.controlState;
            }
        };

        const hoje = new Date();
        const proximoDia = new Date();
        proximoDia.setDate(hoje.getDate() + 1);


        const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const diaDaSemana = diasDaSemana[hoje.getDay()];

        const formatarData = (data) =>
            data.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });

        const pedido =
            `----- PEDIDO DE ABASTECIMENTO -----
Data: ${formatarData(hoje) + ' ' + diaDaSemana}
Para: ${formatarData(proximoDia)}\n

${data
                .map((item) => `- ${item.name} (Estoque: ${countOrState(item)})`)
                .join('\n')}
`;

        res.redirect('https://wa.me/?text=' + encodeURIComponent(pedido));

    } catch (error) {
        res.status(500).render('error', { error, layout: 'layout' });
    }
});
*/

router.get('/', async (req, res) => {

    const inventory = await Inventory.find();

    res.render('order/index', {
        inventory,
        title: 'Pedido',
        layout: 'layout'
    });
});

module.exports = router;