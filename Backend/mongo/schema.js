const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    number:{type:String, default:'Add your number'},
    location:{type:String, default:'Add your location'},
    addedContact: {
        type: [
            {
                name: String,
                phone: String,
                email: String,
                favorite:{type:Boolean,default:false}
            }
        ],
        default: []
    },
},{timestamps:true})

module.exports = mongoose.model('User', User)