const Cliente = require('pg').Client

require('dotenv').config({
    path:  process.env.NODE_DEV == 'dev' ? '.env' : '.env.production'
})

const cliente = new Cliente({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORTA,
    user     : process.env.DB_USUARIO,
    password : process.env.DB_SENHA,
    database : process.env.DB_DATABASE,      
})

cliente.connect()

async function getTasks(){
    try{

        await cliente.query('select * from todolist')
            .then((e)=>[
                teste = (e.rows[0])
        ])
    }catch(err){
        console.log(err)
    }
    return teste
}


async function postTasks(fields){
    let mensagem = ''

    const Query = {
        name: 'Post_tasks',
        text: 'insert into todolist ('
            + 'titulo,'
            + 'mensagem'
            + ')values('
            + '$1,$2)',
        values: [
            fields.titulo,
            fields.mensagem,
        ]
    }

    try{
        await cliente.query(Query)
            .then(()=>{
                mensagem = 'gravado com sucesso'
            })
            
    }catch(err){
        console.log(err)
    }
    return mensagem
}
 
async function deleteTasks(fields){
    
    let mensagem = ''

    const Query = {
        name: 'delete_tasks',
        text: 'delete from todolist'
    }

    try{
        await cliente.query(Query)
            .then(()=>{
                mensagem = 'Dados apagados com sucesso'
            })
            
    }catch(err){
        console.log(err)
    }
    return mensagem
}

async function updateTasks(fields, id){
    
    let mensagem = ''

    const Query = {
        name: 'update_tasks',
        text: 'update todolist set titulo=$1, mensagem=$2 where id=$3', values : [ fields.titulo, fields.mensagem, id]
    }

    try{
        await cliente.query(Query)
            .then(()=>{
                mensagem = 'Dados apagados com sucesso'
            })
            
    }catch(err){
        console.log(err)
    }
    return mensagem
}

module.exports = {getTasks, postTasks, deleteTasks, updateTasks}