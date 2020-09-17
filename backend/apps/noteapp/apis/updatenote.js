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
        const notes = await updateNote(jsonReq);
        if (!notes) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results:{notes}};
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

const updateNote = async (jsonReq) => {
    try {
        if(jsonReq)
        {
            mongoose.connect('mongodb+srv://admin:admin@cluster0.z51wj.mongodb.net/<dbname>?retryWrites=true&w=majority',{
            useUnifiedTopology: true,
             useNewUrlParser: true
            });
            const id=jsonReq._id;
            const doc=await Note.findByIdAndRemove(id);
            const document=await Note.find({});
            const final={
                updatedoc:doc,
                leftdoc:document
            }
            return final;
        }
    } 
    catch (error) {
        throw error;
    }
}

const validateRequest = jsonReq => (jsonReq);
