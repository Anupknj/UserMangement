const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const UserSchema= new Schema({
    first_name:{
        type : String,
        required : [true,'Name is must'],
        minlength: 5, 
        maxlength: 15
    },
    last_name:{
        type :String

    },
    user_name :{
        type : String,
        required :[true,'user name is must'],
        unique: [true,'it is taken'],
        minlength: 5,
        maxlength: 15
    },
    password:{
        type : String,
        required : [true,'Password is must'],
        minlength: 5,
        maxlength: 15
    },

    description :{
        type : String
    }
});



const User = mongoose.model('user',UserSchema);

module.exports = User;
