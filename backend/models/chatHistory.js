import mongoose from "mongoose";

const chatHistorySchema = new mongoose.Schema({

})

const ChatHistory = mongoose.model('ChatHistory',chatHistorySchema)
export default ChatHistory;