const mongoose=require(`${CONSTANTS.APPROOTDIR}/noteapp/3p/node_modules/mongoose`);

const noteSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required:true},
    content: { type: String, required:true}
});

module.exports=mongoose.model('note',noteSchema);