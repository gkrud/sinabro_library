const Book = require('../../../model/book');

const BookWrite = (req,res)=>{
    
    let book = new Book();
    book.title = req.body.title;
    book.status = req.body.status;

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
    Book.findOne({title:req.params.title},{_id:0,title:1,status:1},(err,book)=>{
        if(err) return res.status(500).json({error: err});
        if(!book) return res.status(404).json({error: 'book not found'});
        return res.status(200).json(book);
    });
}

const BookUpdate = (req,res)=>{
    Book.update({ title: req.params.title }, { status : req.body.new }, function(err, output){
        if(err) res.status(500).json({ error: 'database failure' });
        console.log(output);
        if(!output.n) return res.status(404).json({ error: 'book not found' });
        res.json( { message: 'book updated' } );
    });
}

const BookDelete = (req,res)=>{
    Book.remove({ title: req.params.title }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });

        /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        if(!output.result.n) return res.status(404).json({ error: "book not found" });
        res.json({ message: "book deleted" });
        */

        res.status(204).json({message:"success delete"}).end();
    });
}

module.exports = {
    BookWrite,
    BookAll,
    BookRead,
    BookUpdate,
    BookDelete,
}