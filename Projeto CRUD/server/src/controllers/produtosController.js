const Produto = require('../models/produto')

module.exports = {
    async index(req, res){
        const produtos = await Produto.findAll({
            order: [
                ['id', 'DESC'],
            ]
        });

        return res.json(produtos);
    },

    async getOne(req, res){
        const {id} = req.params;
        const produto = await Produto.findByPk(id);

        return res.json(produto);
    },

    async store(req, res){
        const {nome, descricao, preco, quantidade} = req.body;

        const produto = await Produto.create({nome, descricao, preco, quantidade})

        return res.json(produto);
    },

    async edit(req, res){
        const {id} = req.params;
        const {nome, descricao, preco, quantidade} = req.body;
        const produto = await Produto.findByPk(id);

        produto.nome = nome;
        produto.descricao = descricao;
        produto.preco = preco;
        produto.quantidade = quantidade;
        const produtoUpdate = await produto.save();


        

        return res.json(produtoUpdate);
    },

    async delete(req, res){
        const {id} = req.params;
        const produto = await Produto.findByPk(id);
        produto.destroy();

        return res.json(produto);
    },

    

}