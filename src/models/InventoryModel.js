const mongoose = require('mongoose');

// Definindo o esquema para o Inventário
const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Nome é obrigatório
        trim: true,     // Remove espaços extras
    },
    category: {
        type: String,
        required: true, // Categoria é obrigatória
        trim: true,
    },
    count: {
        type: Number,
        required: true, // Contagem é obrigatória
        min: 0,         // Não pode ser negativo
    },
    control: {
        type: Boolean,
        default: false, // Controle ativo ou não (se for gerenciar estoque manualmente, por exemplo)
    },
    lastUpdated: {
        type: Date,
        default: Date.now, // A data da última alteração é automaticamente definida como o momento atual
    },
});

// Adicionando um "hook" para atualizar a data da última alteração quando o documento for atualizado
inventorySchema.pre('save', function (next) {
    this.lastUpdated = Date.now(); // Atualiza a data da última alteração
    next();
});

// Criando o modelo do Inventário
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
