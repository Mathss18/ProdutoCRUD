const { Model, DataTypes } = require('sequelize');

class Produto extends Model {
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            descricao: DataTypes.STRING,
            preco: DataTypes.DECIMAL,
            quantidade: DataTypes.INTEGER,
        }, {
            sequelize: connection
        })
    }
}

module.exports = Produto;