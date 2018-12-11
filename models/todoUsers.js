const mongoose 			= require('mongoose');
const Schema 			= mongoose.Schema;

let TodoUserSchema = new Schema({
    name: {
    	type: String,
    	trim: true,
    	required: true
    },
    password: {
    	type: String,
    	required: true
    },
    email: {
    	type: String,
    	required: false
    }
});


module.exports = mongoose.model('TodoUsers', TodoUserSchema);