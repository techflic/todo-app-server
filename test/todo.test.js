process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

let should = chai.should();
let expect = chai.expect;

let server = require("../app");
// let mongoose = require("mongoose");
// let Todos = require("../models/todos");

describe("Todo App", () => {
    var user = {
        name: "testing",
        email: "testing@gmail.com",
        password: "asd"
    };
    var userId = "";
    var token = "";
    var todo = {};

    beforeEach(done => {
        //Before each test we empty the database ( perform on test DB only )
        // Todos.remove({}, err => {
        //     done();
        // });
        done();
    });

    describe("Register user", () => {
        it("it should create testing user for testing", done => {
            chai.request(server)
                .put("/api/v1/user/")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("Login user", () => {
        it("it should login user successfully", done => {
            chai.request(server)
                .post("/api/v1/user/")
                .send({email: user.email, password: user.password})
                .end((err, res) => {
                    res.should.have.status(200);
                    userId = res.body.data.id;
                    token = res.body.token;
                    done();
                });
        });
    });

    describe("Add Todo", () => {
        it("it should add todo", done => {
            chai.request(server)
                .put("/api/v1/todo/")
                .set("Authorization", "Bearer " + token)
                .send({owner: user.email, name: "test todo", priority: "High"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('savedTodo');
                    todo = res.body.savedTodo;
                    done();
                });
        });
    });

    describe("Get user Todos", () => {
        it("it should get all the Todos", done => {
            chai.request(server)
                .get("/api/v1/todo/" + user.email)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    res.body.data.should.be.a("array");
                    res.body.data.length.should.equal(1);
                    done();
                });
        });
    });

    describe("Update user Todo", () => {
        it("it should update user todo", done => {
            chai.request(server)
                .put("/api/v1/todo/"+user.email+"/"+todo._id)
                .set("Authorization", "Bearer " + token)
                .send({completed: true})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('updatedTodo');
                    done();
                });
        });
    });

    describe("Delete user Todo", () => {
        it("it should delete user todo", done => {
            chai.request(server)
                .delete("/api/v1/todo/"+user.email+"/"+todo._id)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('removedTodo');
                    done();
                });
        });
    });

    describe("Delete user", () => {
        it("it should delete user created for testing", done => {
            chai.request(server)
                .delete("/api/v1/user/"+userId)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    done();
                });
        });
    });
});
