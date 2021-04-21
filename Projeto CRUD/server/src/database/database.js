const Squelize = require('sequelize');

const Produto = require('../models/produto')

const connection = new Squelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'produtos',
    define: {
        timestamps: false,
        
    },

});

Produto.init(connection);

module.exports = connection;