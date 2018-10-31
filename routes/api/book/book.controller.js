const Book = require('../../../model/book');

const BookWrite = (req,res)=>{
    let book = new Book();    
    
    book.title = req.body.title;

    book.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});

    });
}

const BookAll = (req,res)=>{
    Book.find((err,book)=>{
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(book);
    });
}

const BookRead = (req,res)=>{
    Book.findOne({title:req.params.title},{_id:0,title:1},(err,book)=>{
        if(err) return res.status(500).json({error: err});
        if(!book) return res.status(404).json({error: 'book not found'});
        return res.status(200).json(book);
    });
}

module.exports = {
    BookWrite,
    BookAll,
    BookRead,
}