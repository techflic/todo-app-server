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
	},
	createdAt: { 
		type: Date
	},
	updatedAt: { 
		type: Date
	}
});

TodoSchema.pre("save", function(next) {
	this.updatedAt = Date.now();
	if ( !this.createdAt ) {
		this.createdAt = Date.now();
	}
    next();
});


module.exports = mongoose.model('Todos', TodoSchema);