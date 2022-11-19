const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const Rorshach = require('./models/rorschachSchema.js')
const  rorSeed = require('./models/rorschachs.js')

// MIDDLEWARE //
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static('public'))

// BIRD SEED //

app.get('/rorschach-test/seed', (req, res) => {
    Birds.create(birdSeed, (err, data) => {
        console.log('added rorshach data')
        res.redirect('/rorschach-test')
    })
})

// GET ROUTES //

// Index

app.get('/rorschach-test', (req, res) => {
    Birds.find({}, (err, allImages) => {
        res.render('index.ejs', {
            testDb: allImages
        })
    })
})

// EDIT

app.get('/rorschach-test/:id/edit', (req, res) => {
    Birds.findById(req.params.id, (err, foundEntry) => {
        res.render('edit.ejs', {
            foundEntry
        })
    })
})


// SHOW

app.get('/rorschach-test/:id/show', (req, res) => {
    Birds.findById(req.params.id, (err, foundEntry) =>{
        res.render('show.ejs', {
            foundEntry
        })
    })
})


// CREATE

app.get('/rorschach-test/create', (req, res) => {
    res.render('create.ejs')
})

// ACTION ROUTES //

// CREATE

app.post('/rorschach-test', (req, res) =>{
    Birds.create(req.body, (err, createdEntry)=>{
        res.redirect('/rorschach-test')
    })
})
// EDIT

app.put('/rorschach-test/:id', (req, res) =>{
    Birds.findByIdAndUpdate(req.params.id, req.body, {new:true},  (err, updatedEntry)=>{
        res.redirect('/rorschach-test')
    })
})

// DELETE

app.delete('/rorschach-test/:id', (req, res) => {
    Birds.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/rorschach-test')
    })
})


// Is this thing on?
app.listen(3000, () => {
    console.log('listening...')
})
mongoose.connect('mongodb://localhost:27017/basiccrud', () => {
    console.log('The connection with mongosh is established')
})

