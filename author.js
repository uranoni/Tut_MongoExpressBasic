var mongoose = require('mongoose');
var Book = require('./book')
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    email: {
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        type: String,
        // required: true,
        lowercase: true,
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    family_name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    createAt: { type: Date, default: new Date() },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});


AuthorSchema
    .virtual('fullname')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    })


// Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    })



//Export model
module.exports = mongoose.model('Author', AuthorSchema);