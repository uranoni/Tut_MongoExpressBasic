var mongoose = require('mongoose');
var Author = require('./author')
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    authorID: { type: Schema.Types.ObjectId, ref: 'Author' },
    title: String,
    content: String,
    createAt: { type: Date, default: new Date() },
    updateAt: Date
});

module.exports = mongoose.model('Book', BookSchema);