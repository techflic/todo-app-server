const mongoose 			= require('mongoose');
const Schema 			= mongoose.Schema;

let TodoSchema = new Schema({
	owner: {
		type: String,
		required: true
	},
    name: {
    	type: String,
    	trim: true,
    	required: true
	},
	priority: {
    	type: String,
    	required: true
	},
	attachmentDetails: Schema.Types.Mixed,
	attachment: {
		type: Boolean,
		default: false
	},
	archived: {
		type: Boolean,
		default: false
	},
	completed: {
		type: Boolean,
		default: false
	}
});


module.exports = mongoose.model('Todos', TodoSchema);