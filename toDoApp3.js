const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.static(__dirname));
app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/22MSIT004')
const conn = mongoose.connection

conn.on('connected', () => {
    console.log('connected');
})

const noteSchema = mongoose.Schema({
    id: Number,
    name: String,
    status: String
});

const Note = mongoose.model('all_tasks', noteSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Note.html');
});

app.get('/api/notes', (req, res) => {
    Note.find().then((data) => {
        res.json(data);
    })
});

app.post('/api/addNewNote', (req, res) => {
    Note.create({
        id: req.body.id,
        name: req.body.name,
        status: req.body.status

    }).then((newTask) => {
        res.json(newTask)
    })
});


app.put('/api/updateNote/:id', (req, res) => {
        const taskId = req.params.id;
        const updateData = {
            name: req.body.name,
            status: req.body.status
        };
    Note.findOneAndUpdate( {id: taskId }, updateData, { new: true }).then((err, data) => {
        res.json(data);
    });
});


app.delete('/api/deleteNote/:id', (req, res) => {
    const taskId = req.params.id;
    Note.deleteOne({ id: taskId }).then((err, data) => {
        res.json(data);
    });
});
app.listen(1314, function () {
    console.log('Server is running on http://localhost:1314');
});
