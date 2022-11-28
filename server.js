const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Comments = require('./models/userdataSchema.js')
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

// PAST USER SUBMISSIONS PAGE (SHOW)

app.get('/rorschach-test/show', (req, res) => {
    Comments.find({}, (err, allSubmissions) => {
        res.render('show.ejs', {
            userDb: allSubmissions
        })
    })
})


// EDIT PAGE

app.get('/rorschach-test/:id/edit', (req, res) => {
    Comments.findById(req.params.id, (err, foundEntry) => {
        res.render('edit.ejs', {
            entry: foundEntry
        }) 
    }) 
})



// INDEX PAGE

app.get('/rorschach-test', (req, res) => {
    res.render('index.ejs')
})



// CREATE USER SUBMISSION PAGE


app.get('/rorschach-test/create', (req, res) => {
    Rorschach.find({}, (err, allImages) => {
        res.render('create.ejs', {
            testDb: allImages
        })
    })
})

// ACTION ROUTES //

// CREATE

app.post('/rorschach-test/create', (req, res) =>{
    Comments.create(req.body, (err, createdEntry)=>{
        res.redirect('/rorschach-test/show')
    })
})

  

// EDIT

app.put('/rorschach-test/:id/edit', (req, res) =>{
    Comments.findByIdAndUpdate(req.params.id, req.body, {new:true},  (err, updatedEntry)=>{
        updatedEntry.comments.push()
        updatedEntry.save((err,data) => {
        res.redirect('/rorschach-test/show')
        })
    })
})

// DELETE

app.delete('/rorschach-test/:id/edit', (req, res) => {
    Comments.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/rorschach-test/show')
    })
})


// Is this thing on?
app.listen(3000, () => {
    console.log('listening...')
})
mongoose.connect('mongodb://localhost:27017/basiccrud', () => {
    console.log('The connection with mongosh is established')
})

