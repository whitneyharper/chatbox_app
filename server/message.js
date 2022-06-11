const mongoose = require("mongoose");
const { Schema } = mongoose;
const MessageSchema = new Schema({
    body: String,
    user: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model("Message", MessageSchema)