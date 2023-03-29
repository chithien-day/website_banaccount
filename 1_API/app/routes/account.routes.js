/**
 * @swagger
 * components:
 *   schemas:
 *     Accounts:
 *       type: object
 *       required:
 *         - id_gametype
 *         - description
 *         - game_picture
 *         - gameusername
 *         - gamepass
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the game
 *         id_gametype:
 *           type: string
 *           description: ID of your game type
 *         description:
 *           type: string
 *           description: Description of the account
 *         game_picture:
 *           type: string
 *           description: The picture of the account
 *         gameusername:
 *           type: string
 *           description: Username of this account
 *         gamepass:
 *           type: string
 *           description: Password of this account
 *       example:
 *         id_gametype: 641f0c2369e9636e7b0a6475
 *         description: Blank info
 *         game_picture: c://abc.png
 *         gameusername: abc
 *         gamepass: abcpass
 */
/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: The games managing API
 * /accounts:
 *   get:
 *     summary: Lists all the accounts
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: The list of the accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Accounts'
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Accounts'
 *     responses:
 *       200:
 *         description: The created account.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Accounts'
 *       500:
 *         description: Some server error
 * /accounts/{id}:
 *   get:
 *     summary: Get the account by id
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The account id
 *     responses:
 *       200:
 *         description: The account response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/accounts'
 *       404:
 *         description: The account was not found
 *   put:
 *    summary: Update the account by the id
 *    tags: [Accounts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Account id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Accounts'
 *    responses:
 *      200:
 *        description: The account was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Accounts'
 *      404:
 *        description: The account was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the account by id
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The account id
 *
 *     responses:
 *       200:
 *         description: The account was deleted
 *       404:
 *         description: The account was not found
 */
module.exports = app => {
    const accounts = require("../controllers/account.controller.js");
  
    var router = require("express").Router();
    
    router.post("/", accounts.create);
  
    router.get("/", accounts.findAll);
  
    router.get("/:id", accounts.findOne);
  
    router.put("/:id", accounts.update);
  
    router.delete("/:id", accounts.delete);
  
    router.delete("/", accounts.deleteAll);
  
    app.use('/api/accounts', router);
  };