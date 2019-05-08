var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Author = require('./author')
var Book = require('./book')

var mongoDB = 'mongodb://127.0.0.1/bookstore';
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
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
        })
        user.save()
        console.log("init data")
    } else {
        console.log("init already")
    }


}
initdata()
app.get('/fullname', async function (req, res) {
    try {
        const result = await Author.findOne({
            first_name: "YU-CHIAO"
        })
        if (!result) {
            console.log(result)
            throw ("找不到使用者");
        }
        console.log(result.fullname, result.url)
        res.send({ fullname: result.fullname, url: result.url })
    } catch (error) {

        console.log(error)
        res.status(404).send(error)
    }
});

app.route('/user')
    .post((req, res) => {
        const user = new Author({
            email: "test@gmail.com",
            first_name: "Bill",
            family_name: "Gates",
        })
        user.save().then(result => {
            res.send(result)
        }).catch(err => {
            console.log(err)
            res.status(402).send(err)
        })
    })
    .delete((req, res) => {
        Author.findOneAndDelete({ email: "test@gmail.com" }).then((result) => {
            // 要判斷對象在不在
            if (!result) throw ("找不到使用者")

            console.log(result)
            res.send(result)
        }).catch(err => {
            res.status(404).send(err)
        })
    })

app.route('/book')
    .post(async (req, res) => {
        try {
            var user = await Author.findOne({
                first_name: "YU-CHIAO"
            })
            if (!user) {
                console.log(user)
                throw ("找不到使用者");
            }

        } catch (error) {
            res.status(404).send(error)
        }
        console.log(user)

        const book = new Book({
            title: 'Graphql',
            content: "good course for graphql",
            authorID: user._id
        });

        book.save().then(result => {
            res.send(result)
        }).catch(err => {
            res.status(402).send('create fail')
        })
    })
    .get(async (req, res) => {
        Book.find({ title: 'Graphql' })
            .populate('authorID')
            .then(result => {
                console.log(result)
                res.send(result)
            })
            .catch(err => {
                res.status(404).send("Couldn't find")
            })

    })

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});