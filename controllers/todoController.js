const Todos = require("../models/todos");
const path = require("path");

const todoController = {
    saveTodoFile: (request, response, next) => {
        // uses todo _id to update
        Todos.findById(request.params.todoId, (err, todo) => {
            if (err) {
                return next(err);
            } else {
                if (!todo) {
                    return response.status(404).json({
                        success: false,
                        message: "Todo not found",
                        token: request.token
                    });
                } else {
                    todo.set({
                        attachmentDetails: request.file,
                        attachment: true
                    });

                    todo.save((saveErr, updatedTodo) => {
                        if (saveErr) {
                            return next(saveErr);
                        } else {
                            Todos.find(
                                { owner: request.params.userId },
                                (listErr, todosList) => {
                                    if (listErr) {
                                        return next(listErr);
                                    } else {
                                        return response.status(200).json({
                                            success: true,
                                            message:
                                                "Todo File Saved successfully",
                                            token: request.token,
                                            updatedTodo: updatedTodo,
                                            data: todosList
                                        });
                                    }
                                }
                            );
                        }
                    });
                }
            }
        });
    },
    getTodoFile: (request, response, next) => {
        // uses todo _id to retrieve
        Todos.findById(request.params.todoId, (err, todo) => {
            if (err) {
                return next(err);
            } else {
                if (!todo) {
                    return response.status(404).json({
                        message: "Todo not found"
                    });
                } else {
                    if (todo.attachment) {
                        const file = path.join("./public/uploads/",todo.attachmentDetails.filename);
                        response.download(file, todo.attachmentDetails.originalname);
                        //response.attachment(file);
                    } else {
                        return response.status(404).json({
                            success: false,
                            message: "Todo attachment not available",
                            token: request.token
                        });
                    }
                }
            }
        });
    },
    getUserTodos: (request, response, next) => {
        Todos.find({ owner: request.params.userId }, (err, todos) => {
            if (err) {
                return next(err);
            } else {
                return response.status(200).json({
                    success: true,
                    message: "User todos",
                    token: request.token,
                    data: todos
                });
            }
        });
    },
    getTodo: (request, response, next) => {
        // uses todo _id to retrieve
        Todos.findById(request.params.todoId, (err, todo) => {
            if (err) {
                return next(err);
            } else {
                if (!todo) {
                    return response.status(404).json({
                        message: "Todo not found"
                    });
                } else {
                    return response.status(200).json({
                        success: true,
                        message: "Todo retrieved",
                        token: request.token,
                        data: todo
                    });
                }
            }
        });
    },
    createTodo: (request, response, next) => {
        let todo = new Todos({
            owner: request.body.owner,
            name: request.body.name,
            priority: request.body.priority
        });
        todo.save((saveErr, savedTodo) => {
            if (saveErr) {
                return next(saveErr);
            } else {
                Todos.find(
                    { owner: request.body.owner },
                    (listErr, todosList) => {
                        if (listErr) {
                            return next(listErr);
                        } else {
                            return response.status(200).json({
                                success: true,
                                message: "Todo saved successfully",
                                savedTodo: savedTodo,
                                data: todosList
                            });
                        }
                    }
                );
            }
        });
    },
    updateTodo: (request, response, next) => {
        // uses todo _id to update
        Todos.findById(request.params.todoId, (err, todo) => {
            if (err) {
                return next(err);
            } else {
                if (!todo) {
                    return response.status(404).json({
                        success: false,
                        message: "Todo not found",
                        token: request.token
                    });
                } else {
                    // Update todo with the available fields
                    // This assumes the field name is the same in the form and the database.
                    todo.set(request.body);

                    todo.save((saveErr, updatedTodo) => {
                        if (saveErr) {
                            return next(saveErr);
                        } else {
                            Todos.find(
                                { owner: request.params.userId },
                                (listErr, todosList) => {
                                    if (listErr) {
                                        return next(listErr);
                                    } else {
                                        return response.status(200).json({
                                            success: true,
                                            message:
                                                "Todo updated successfully",
                                            token: request.token,
                                            updatedTodo: updatedTodo,
                                            data: todosList
                                        });
                                    }
                                }
                            );
                        }
                    });
                }
            }
        });
    },
    deleteTodo: (request, response, next) => {
        // uses todo _id to delete
        Todos.findById(request.params.todoId, (err, todo) => {
            if (err) {
                return next(err);
            } else {
                if (!todo) {
                    return response.status(404).json({
                        success: false,
                        message: "Todo not found",
                        token: request.token
                    });
                } else {
                    todo.remove((todoErr, removedTodo) => {
                        if (todoErr) {
                            return next(todoErr);
                        } else {
                            Todos.find(
                                { owner: request.params.userId },
                                (listErr, todosList) => {
                                    if (listErr) {
                                        return next(listErr);
                                    } else {
                                        return response.status(200).json({
                                            success: true,
                                            message:
                                                "Todo deleted successfully",
                                            token: request.token,
                                            removedTodo: removedTodo,
                                            data: todosList
                                        });
                                    }
                                }
                            );
                        }
                    });
                }
            }
        });
    }
};

module.exports = todoController;
