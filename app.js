var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Author = require('./author')

var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {
    useNewUrlParser: true
});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function initdata() {
    const result = await Author.find({
        first_name: "YU-CHIAO"
    })
    if (result.length == 0) {
        var user = new Author({
            first_name: "YU-CHIAO",
            family_name: "CHANG",
            date_of_birth: new Date(),
            date_of_death: Date()
        })
        user.save()
        console.log("init data")
    } else {
        console.log("init already")
    }


}
initdata()
app.get('/', async function (req, res) {
    try {
        const result = await Author.findOne({
            first_name: "YU-CHIAO"
        })
        console.log(result.username)
        res.send(result)
    } catch (error) {

        console.log(error)
        res.status(404).send("404")

    }



});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});