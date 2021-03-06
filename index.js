const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r6xxa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
       await client.connect();
       const serviceCollection= client.db('electronics-warehouse').collection('servics')
       app.get('/servics', async (req,res)=>{
        const query ={};
        const cursor = serviceCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
       })
    }
    finally{

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('my electronics warehouse server')
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});