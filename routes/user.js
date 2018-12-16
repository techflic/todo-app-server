// /api/v1/user/

const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const verify = require("../helpers/utils").verify;

/**
 * @swagger
 * definition:
 *   response:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *        message:
 *          type: string
 *        token:
 *          type: string
 */

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email to use for login.
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful login
 */
router.post("/", userController.loginUser);

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Standard response object with data
 *         schema:
 *           $ref: '#/definitions/response'
 *           properties:
 *             data:
 *               type: array
 */
router.get("/", verify, userController.getAllUsers);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     description: Returns user for id sent in request
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: query
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Standard response object with data
 *         schema:
 *           $ref: '#/definitions/response'
 *           properties:
 *             data:
 *               type: object
 */
router.get("/:id", verify, userController.getUser);

/**
 * @swagger
 *
 * /api/v1/user:
 *   put:
 *     description: Creates a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: User name
 *         in:  body
 *         required: true
 *         type: string
 *       - name: email
 *         description: User email
 *         in:  body
 *         required: true
 *         type: string
 *       - name: password
 *         description: User password
 *         in:  body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.put("/", userController.registerUser);

/**
 * @swagger
 *
 * /api/v1/user/{id}:
 *   put:
 *     description: Updates a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: query
 *         required: true
 *         type: integer
 *       - name: name
 *         description: User name
 *         in:  body
 *         type: string
 *       - name: email
 *         description: User email
 *         in:  body
 *         type: string
 *       - name: password
 *         description: User password
 *         in:  body
 *         type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/:id", verify, userController.updateUser);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   delete:
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: query
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: user deleted sucessfully
 */
router.delete("/:id", verify, userController.deleteUser);

module.exports = router;
