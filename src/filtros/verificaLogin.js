const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');

const verificaLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Não autorizado');
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, senhaHash);

        const usuarios = await knex('usuarios').where({ id }).first();

        if (!usuarios) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { senha, ...usuario } = usuarios;

        req.usuario = usuario;

        next();
    } catch (error) {
        if (error.message === "jwt expired") {
            return res.status(400).json('Token expirado, insira um novo')
        }
        if (error.message === "jwt malformed") {
            return res.status(400).json('Inserir um Token válido')
        }
        return res.status(400).json(error.message);
    }
}

module.exports = verificaLogin