const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
    title: String,
    status: Boolean,
});

Book.static.create = (title,status)=>{
    const book = new this({
        title,
        status
    });
    return book.save();
}

module.exports = mongoose.model('Book',Book);