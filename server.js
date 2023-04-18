const { default: mongoose, mongo } = require('mongoose');
const{MongoClient, ServerApiVersion} = require('mongodb');
const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const transaction = require('./models/transaction');
const methodOverride = require('method-override');
// mongoose.connect('mongodb+srv://deeprautswann:<KFfFJDMEvDlcdHJ3>@cluster0.joz2gah.mongodb.net/?retryWrites=true&w=majority',{//mongodb+srv://deeprautswann:<password>@cluster0.joz2gah.mongodb.net/?retryWrites=true&w=majority//mongodb://localhost:27017/expenseTracker
//     useNewUrlParser : true,
//     useUnifiedTopology : true
// })


// const uri = "mongodb+srv://deeprautswann:mgaD0RnEV9mboDaZ@cluster0.joz2gah.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri,{
//     serverApi:{
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);
// const db =mongoose.connection;
// db.on("error",console.error.bind(console,"Connection error : "));
// db.once("open",()=>{
//     console.log("Database connected");
// });
mongoose.connect('mongodb+srv://deeprautswann:mgaD0RnEV9mboDaZ@cluster0.joz2gah.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

//Checking for error
const db = mongoose.connection;
db.on("error",console.error.bind(console,"Connection error : "));
db.once("open",()=>{
    console.log("Database connected");
});
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));

app.engine('ejs',ejsMate)

app.get('/',async(req,res)=>{
    const transaction_list = await transaction.find({});
    res.render('transaction/form',{transaction_list});
})

app.post('/',async(req,res)=>{
    const Transaction = new transaction(req.body.Transaction);
    await Transaction.save();
    console.log(Transaction);
    res.redirect('/');
})

app.delete('/:id',async(req,res)=>{
    const{id} = req.params;
    await transaction.findByIdAndDelete(id);
    res.redirect('/');
})

app.listen(8080,()=>{
    console.log("Serving on port 8080");
})