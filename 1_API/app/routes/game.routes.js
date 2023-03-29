/**
 * @swagger
 * components:
 *   schemas:
 *     Games:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the game
 *         name:
 *           type: string
 *           description: The title of your game
 *       example:
 *         name: Genshin
 */
/**
 * @swagger
 * tags:
 *   name: Games
 *   description: The games managing API
 * /games:
 *   get:
 *     summary: Lists all the games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: The list of the games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Games'
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Games'
 *     responses:
 *       200:
 *         description: The created game.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Games'
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete all the games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Delete all games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Games'
 * /games/{id}:
 *   get:
 *     summary: Get the game by id
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The game id
 *     responses:
 *       200:
 *         description: The game response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Games'
 *       404:
 *         description: The game was not found
 *   put:
 *    summary: Update the game by the id
 *    tags: [Games]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The game id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Games'
 *    responses:
 *      200:
 *        description: The game was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Games'
 *      404:
 *        description: The game was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the game by id
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The game id
 *
 *     responses:
 *       200:
 *         description: The game was deleted
 *       404:
 *         description: The game was not found
 */

module.exports = app => {
  const accounts = require("../controllers/game.controller.js");

  var router = require("express").Router();
  
  router.post("/", accounts.create);

  router.get("/", accounts.findAll);

  router.get("/:id", accounts.findOne);

  router.put("/:id", accounts.update);

  router.delete("/:id", accounts.delete);

  router.delete("/", accounts.deleteAll);

  app.use('/api/games', router);
};