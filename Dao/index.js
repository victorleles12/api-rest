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
    try {
        const result = await cliente.query('select * from todolist');
        if(result){
            return result.rows
        }else{
            return;
        }
    } catch (error) {
        return;
    }
}


async function postTasks(fields){
    let resposta = ''

    const Query = {
        name: 'Post_tasks',
        text: 'insert into todolist ('
            + 'titulo,'
            + 'mensagem'
            + ')values('
            + '$1,$2)',
        values: [
            fields.fields.titulo,
            fields.fields.mensagem,
        ]
    }

    try{
        await cliente.query(Query)
            .then(()=>{
                resposta = 'gravado com sucesso'
            })
            
    }catch(err){
        console.log(err)
    }
    return resposta
}
 
async function deleteTasks(id){
    
    let mensagem = ''

    const Query = {
        name: 'delete_tasks',
        text: 'delete from todolist where id = $1', values: [id] 
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
                mensagem = 'Dados alterados com sucesso'
            })
            
    }catch(err){
        console.log(err)
    }
    return mensagem
}

module.exports = {getTasks, postTasks, deleteTasks, updateTasks}