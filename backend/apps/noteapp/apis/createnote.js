/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed LICENSE file.
 */

// Custom modules

const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/noteapp/apis/lib/constants`);
const mongoose=require(`${CONSTANTS.APPROOTDIR}/noteapp/3p/node_modules/mongoose`);
const Note=require(`${CONSTANTS.APPROOTDIR}/noteapp/db/model`);


exports.doService = async jsonReq => {
    // Validate API request and check mandatory payload required
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;

    try {
        const notes = await createNote(jsonReq);
        if (!notes) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: { notes } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
1    }
}

const createNote = async (jsonReq) => {
    try {
        if(jsonReq)
        {
            mongoose.connect('mongodb+srv://admin:admin@cluster0.z51wj.mongodb.net/<dbname>?retryWrites=true&w=majority',{
            useUnifiedTopology: true,
             useNewUrlParser: true
            });
            const note=new Note({
                _id:new  mongoose.Types.ObjectId(),
                title: jsonReq.title,
                content: jsonReq.content
            });
            const doc=await note.save();
            const document=await Note.find({});
            return document;
        }
    } catch (error) {
        throw error;
    }
}

const validateRequest = jsonReq => (jsonReq);
