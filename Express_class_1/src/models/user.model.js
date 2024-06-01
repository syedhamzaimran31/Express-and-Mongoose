const mongoose = require('mongoose');
const { Schema } = mongoose;

//model object
const UserSchema = new Schema({
    userNmae: String,
    password: String,
    image: String,// Store in bucket , store retrieved URL
    address: String,

});

//uid is aut given in mongo
const toDoSchema = new Schema(
    [
        //Education
        {
            id: String,
            educationToDo: String,
       
        },
        //Job
        {
            id: String,
            jobToDo: String,
        }
    ]
)


//model

const UserMode = mongoose.model('User', UserSchema);

module.exports = {
    UserModel
}