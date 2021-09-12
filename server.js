const express = require('express')
const app = express();
const { getTasks, postTasks, deleteTasks, updateTasks } = require('./Dao/index')
const porta = 8080
var cors = require('cors')
app.use(express.json());


app.use(cors())


app.get('/getdados', async (req, res) => {
  try{
    const dados = await getTasks(req)
    res.json({dados})
  }catch(error){
    res.status(500).send([{ message: error.message }])
  }
  });


  app.post('/postdados', async (req, res) => {
    try{
      await postTasks(req.body)
      res.status(200).send([{ message: 'agora foi'}])
    }catch(error){
        res.status(500).send([{ message: error.message }])
    }
    });

  app.delete('/deletedados/:id', async (req, res) => {
    try{
      await deleteTasks(req.params.id)
        res.json('Dados apagados com sucesso')
    }catch(error){
        res.status(500).send([{ message: error.message }])
    }
    });

    app.put('/updatedados/:id', async (req, res) => {
      try{
        await updateTasks((req.body), req.params.id)
          res.json('Dados alterados com sucesso')
      }catch(error){
          res.status(500).send([{ message: error.message }])
      }
      });

  app.listen(process.env.Port || porta, () =>{})