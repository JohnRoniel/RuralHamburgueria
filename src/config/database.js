require('dotenv').config();
const mongoose = require('mongoose');

// Função para conectar ao MongoDB
async function database() {
    try {
        // Conectar ao MongoDB usando a URL do banco de dados
        const conn = await mongoose.connect(process.env.MONGODB_URI);

    } catch (error) {
        console.error('Erro ao conectar com MongoDB:', error.message);
        process.exit(1); // Encerra o processo caso não consiga conectar
    }
};

module.exports = database;