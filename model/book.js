const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
    title: String,
});

Book.static.create = (title)=>{
    const book = new this({
        title
    });
    return book.save();
}

module.exports = mongoose.model('Book',Book);