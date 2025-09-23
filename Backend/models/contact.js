const mongoose = require("mongoose")

const contactschema =  new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    name: {
        type: String,
        required: true,
    },
    email: String,
    phone: String,
    type: {
        type: String,
        enum: ["Work", "Home", "personal","Other"],
        default: "Other",
    },
    notes: String,
},
{ timestamps: true })

module.exports = mongoose.model("Contact",contactschema)