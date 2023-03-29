/**
 * @swagger
 * components:
 *   schemas:
 *     Authentications:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the accounts
 *         username:
 *           type: string
 *           description: The title of your account
 *         email:
 *           type: string
 *           description: The title of your email
 *         password:
 *           type: strign
 *           description: The title of your password
 *       example:
 *         username: Genshin
 *         email: Genshin
 *         password: Aa@123
 */
/**
 * @swagger
 * tags:
 *   name: Authentications
 *   description: The Athentication managing API
 * /auth/signin:
 *   post:
 *     summary: Login to your account
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Authentications'
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Authentications'
 *       500:
 *         description: Some server error
 * /auth/adsignup:
 *   post:
 *     summary: Signup to the admin account
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Authentications'
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Authentications'
 *       500:
 *         description: Some server error
 * /auth/signup:
 *   post:
 *     summary: Signup the user account
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Authentications'
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Authentications'
 *       500:
 *         description: Some server error
 */

const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post(
    "/api/auth/adsignup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.adsignup
  );

  app.post("/api/auth/signin", controller.signin);
};