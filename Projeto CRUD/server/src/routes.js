const express = require('express');
const ProdutoController = require('../src/controllers/produtosController')

const routes = express.Router()

// ======================= HOME ==============================
routes.get('/',  (req, res)=>{
    return res.json({message: 'oi'})
});

// ======================= PRODUTOS ==============================
routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:id', ProdutoController.getOne);
routes.post('/produtos', ProdutoController.store);
routes.put('/produtos/:id', ProdutoController.edit);
routes.delete('/produto/:id', ProdutoController.delete);

module.exports = routes;