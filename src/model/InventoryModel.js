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
        required: false,
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

// Função para formatar a data no formato "00:00 01/01/2025" com fuso horário de São Paulo
function formatDate(date) {
    const options = {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    const formattedDate = formatter.format(date).replace(',', ' às');
    return formattedDate
}

// Hook para atualizar a data da última alteração
inventorySchema.pre('save', function (next) {
    const currentDate = new Date();
    this.lastUpdated = formatDate(currentDate); // Atualiza o campo lastUpdated com a data formatada
    next();
});

// Criando o modelo do Inventário
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;