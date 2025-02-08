const mongoose = require('mongoose');

/*
    _id: Identificador único do inventário
    name: Nome do item
    category: Categoria do item
    countMin: Quantidade mínima do item
    count: Quantidade atual do item
    control: Tipo de controle do item
    controlState: Estado do estoque do item
    lastUpdated: Data da última alteração
*/
const inventorySchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    countMin: {
        type: Number,
        min: 0,
        default: 0,
    },
    count: {
        type: Number,
        required: true,
        min: 0,
    },
    control: {
        type: String,
        required: true
    },
    controlState: {
        type: String,
        default: ''
    },
    lastUpdated: {
        type: String
    },
});

// Criando o modelo do Inventário
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;