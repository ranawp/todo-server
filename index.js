const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

//middleware 
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://todos:Y60w1LaE2IYMDCmr@cluster0.kxv5i.mongodb.net/?retryWrites=true&w=majority";

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a1aje.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const todoCollection = client.db('todo').collection('todos')

        app.get('/', async (req, res) => {
            res.send('running server')
        })
        app.get('/todo', async (req, res) => {
            const query = {};
            const cursur = todoCollection.find(query);
            const todos = await cursur.toArray()
            res.send(todos)
        })
        app.post('/todo', async (req, res) => {
            const newTodo = req.body;
            const result = await todoCollection.insertOne(newTodo)
            res.send(result)
        })

        
    }
    finally {

    }

}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('running server')
})
app.listen(port, () => {
    console.log('listening to port', port)
})