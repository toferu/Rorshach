const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const Rorschach = require('./models/rorschachSchema.js')
const  rorSeed = require('./models/rorschachs.js')

// MIDDLEWARE //
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static('public'))

// IMAGE SEED //

app.get('/rorschach-test/seed', (req, res) => {
    Rorschach.create(rorSeed, (err, data) => {
        console.log('added rorshach data')
        res.redirect('/rorschach-test')
    })
})

// GET ROUTES //

// This is the page where users input their interpretations of images

app.get('/rorschach-test/:id/show', (req, res) => {
    Rorschach.find({}, (err, allImages) => {
        res.render('show.ejs', {
            testDb: allImages
        })
    })
})

// EDIT

// app.get('/rorschach-test/edit', (req, res) => {
//     Rorschach.findById(req.params.id, (err, foundEntry) => {
//         res.render('edit.ejs', {
//             foundEntry
//         })
//     })
// })

app.get('/rorschach-test/edit', (req, res) => {
    Rorschach.find({}, (err, allImages) => {
        res.render('edit.ejs', {
            testDb: allImages
        })
    })
})

// INDEX

app.get('/rorschach-test', (req, res) => {
    res.render('index.ejs')
})

// app.get('/rorschach-test/:id/show', (req, res) => {
//     Rorschach.findById(req.params.id, (err, foundEntry) =>{
//         res.render('show.ejs', {
//             foundEntry
//         })
//     })
// })


// CREATE

app.get('/rorschach-test/create', (req, res) => {
    res.render('create.ejs')
})

// ACTION ROUTES //

// CREATE

app.post('/rorschach-test', (req, res) =>{
    Rorschach.create(req.body, (err, createdEntry)=>{
        res.redirect('/rorschach-test')
    })
})
// EDIT

app.put('/rorschach-test/:id', (req, res) =>{
    Rorschach.findByIdAndUpdate(req.params.id, req.body, {new:true},  (err, updatedEntry)=>{
        res.redirect('/rorschach-test')
    })
})

// DELETE

app.delete('/rorschach-test/:id', (req, res) => {
    Rorschach.findByIdAndRemove(req.params.id, (err, data) => {
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

