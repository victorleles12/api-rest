const Cliente = require('pg').Client

require('dotenv').config({
    path:  process.env.NODE_DEV == 'dev' ? '.env' : '.env.production'
})

async function conexao(){
    const cliente = new Cliente({
        host     : process.env.DB_HOST,
        port     : process.env.DB_PORTA,
        user     : process.env.DB_USUARIO,
        password : process.env.DB_SENHA,
        database : process.env.DB_DATABASE,      
    })
    
    return cliente
}


module.exports = {conexao}