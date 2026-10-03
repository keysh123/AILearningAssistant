import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({

})

const Document = mongoose.model('Document',documentSchema)
export default Document;