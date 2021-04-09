const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');
const app = express();

app.use(express.urlencoded({ extended: true }));
const mongodb = 'mongodb+srv://dbUser:root@cluster0.5xidu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongodb,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => 
{
    console.log('connected');
    app.listen(3000);
}).catch(err => console.log(err))


app.set('view engine','ejs');

/*
app.get('/create-item', (req,res) =>{
    const item = new Item({
        name:'computer',
        price:2000
    });
    item.save().then(result => res.send(result))
})
*/


app.get('/',(req,res) => {
    res.redirect('/get-items');
})

app.get('/get-items', (req,res) => {
    Item.find().then(result => {
        res.render('index',{ items:result });
    }).catch(err => console.log(err))
})

app.get('/add-item',(req,res) => {
    res.render('add-item');
})

app.post('/items',(req,res) =>{
    console.log(req.body)
    const item = Item(req.body);
    item.save().then(() => {
        res.redirect('/get-items')
    }).catch(err => console.log(err))
})

app.get('/items/:id', (req,res) => {
    const id = req.params.id;
    Item.findById(id).then(result => {
        console.log('result',result);
        res.render('item-detail', { item: result })
    })
})  

app.delete('/items/:id', (req,res) => {
    const id = req.params.id;
    Item.findByIdAndDelete(id).then(result => {
        res.json({ redirect: '/get-items'})
    })
}) 

app.put('/items/:id', (req,res) => {
    const id = req.params.id;
    Item.findByIdAndUpdate(id, req.body).then(result => {
        res.json({ msg: 'Updated Successfully !'})
    })
}) 

app.use((req,res) => {
    res.render('error');
})


