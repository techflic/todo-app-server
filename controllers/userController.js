
const bcrypt 				= require('bcrypt');
const saltRounds 			= 10;
const JWT 		 			= require('../helpers/jwt-helper');
const TodoUsers 			= require('../models/todoUsers');

const userController = {
	registerUser: (request, response, next) => {
		TodoUsers.findOne({email: request.body.email}, (err, user) => {
			if(err){
				return next(err)
			}else{
				if(user){
					return response.status(409).json({
						'success': false,
		                'message': "User already exists"
		            })
				}else{
					let user = new TodoUsers({
						name: request.body.name,
						password: bcrypt.hashSync(request.body.password, saltRounds),
						email: request.body.email
					})
					user.save((saveErr, savedUser) => {
						if(saveErr){
							return next(saveErr)
						}else{
							return response.status(200).json({
					    		'success': true,
					    		'message': 'user registered successfully',
					    		'data': savedUser
					    	})
						}
					})
				}
			}
		})
	},
	loginUser: (request, response, next) => {
		TodoUsers.findOne({email: request.body.email}, (err, user) => {
			if(err){
				return next(err)
			}else{
				if(!user){
					return response.status(404).json({
						'success': false,
		                'message': "User not found"
		            })
				}else{
					if(bcrypt.compareSync(request.body.password, user.password)){
						const token = JWT.sign({email: request.body.email})
				    	return response.status(200).json({
				    		'success': true,
							'token': token,
							'data': {
								id: user._id,
								name: user.name,
								email: user.email
							},
				    		'message': 'user logged In successfully'
				    	})
					}else{
						return response.status(401).json({
				    		'success': false,
				    		'message': 'incorrect password'
				    	})
					}
				}
			}
		})
	},
	getUser: (request, response, next) => {	// uses id and not email // role : ["admin"]
		TodoUsers.findById(request.params.id, (err, user) => {
			if(err){
				return next(err)
			}else{
				if(!user) {
		            return response.status(404).json({
		                message: "User not found"
		            });            
		        }else{
		        	return response.status(200).json({
						'success': true,
						'message': 'user profile',
						'token': request.token,
						'data': user
					})
		        }
			}
		})
	},
	getAllUsers: (request, response, next) => {
		TodoUsers.find({}, (err, users) => {
			if(err){
				return next(err)
			}else{
				return response.status(200).json({
					'success': true,
					'message': 'all users profile',
					'token': request.token,
					'data': users
				})
			}
		})
	},
	updateUser: (request, response, next) => {	// uses id and not email
		TodoUsers.findById(request.params.id, (err, user) => {
			if(err){
				return next(err)
			}else{
				if(!user){
					return response.status(404).json({
						'success': false,
						'message': "User not found",
						'token': request.token
		            })
				}else{
					// This assumes all the fields of the object is present in the body.
				    // user.name = request.body.name
				    // user.password = bcrypt.hashSync(request.body.password, saltRounds)
				    // user.email = request.body.email

				    // Update user with the available fields
				    // This assumes the field name is the same in the form and the database.
				    user.set(request.body) // Add checks for encryption in case of password update
				    
				    user.save((saveErr, updatedUser) => {
				        if(saveErr){
							return next(saveErr)
						}else{
							return response.status(200).json({
					    		'success': true,
								'message': 'user updated successfully',
								'token': request.token,
					    		'data': updatedUser
					    	})
						}
				    })
				}
			}
		})
	},
	deleteUser: (request, response, next) => {	// uses id and not email // role : ["admin"]
		TodoUsers.findById(request.params.id, (err, user) => {
			if(err){
				return next(err)
			}else{
				if(!user){
					return response.status(404).json({
						'success': false,
						'message': "User not found",
						'token': request.token
		            })
				}else{
					user.remove((userErr, removedUser) => {
						if(userErr){
							return next(userErr)
						}else{
							return response.status(200).json({
					    		'success': true,
								'message': 'user deleted successfully',
								'token': request.token,
					    		'data': removedUser
					    	})
						}
				    })
				}
			}
		})
	}
}

module.exports = userController;
