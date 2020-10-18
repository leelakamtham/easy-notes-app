const Note = require('../models/note.model.js');
const { db } = require('../models/note.model.js');



//create and save new note
exports.create = (req,res)=>{
//validate req
   if(!req.body.content){
        return res.status(400).send({
          message:"note content can not be empty"
        });
    }


    //create a new note
    const note = new Note({
        title:req.body.title || "untitled note",
        content: req.body.content
    });


    //save note in db
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "some error coccured"
        })
    })

}



 //******  retrieve and return all notes from db */
exports.findAll = (req,res)=>{

Note.find()
.then(notes =>{
    res.send(notes);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "some error occured"
        })
    })


}


 //******  retrieve and return single note from db */
exports.findOne = (req,res)=>{
    Note.findOne({_id:req.params.noteId})
    .then(note => {
        if(!note){
            return res.status(500).send({
                message: "Note not found" +req.params.noteId
            })

        }else{ 
        return res.status(200).send(note)
        }
})

}

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

  // Validate Request
  if(!req.body.content) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}

// Find note and update it with the request body
Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title || "Untitled Note",
    content: req.body.content
}, {new: true})
.then(note => {
    if(!note) {
        return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
        });
    }
    res.send(note);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
        });                
    }
    return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId
    });
});



};




// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
 Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};

/*
exports.searchPost = async (req,res)=>{
    var response = [];
    //console.log(req.query)

    //search with title name
    if( req.query.title ){
        response = await db.Note.find({title: req.query.title});
            
                
   }
res.json(response)

}
*/


//post = note
//postSchema = noteSchema