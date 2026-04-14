"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const collection_routes_1 = __importStar(require("./collection.routes"));
const favorite_routes_1 = __importDefault(require("./favorite.routes"));
const shoppingList_routes_1 = __importDefault(require("./shoppingList.routes"));
const recipe_controller_1 = require("../controllers/recipe.controller");
const router = (0, express_1.Router)();
/**
 * @openapi
 * '/api/users/register':
 *  post:
 *     tags:
 *     - Users
 *     summary: Register a user
 *     description: Route to register a user to the application
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/RegistrationInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegistrationResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/register', user_controller_1.register);
/**
 * @openapi
 * '/api/users/{id}/profile':
 *  get:
 *     tags:
 *     - Users
 *     summary: Profile Route
 *     description: Route to register a user to the application
 *     parameters:
 *        - name: id
 *          in: path
 *          description: The id of the user Profile to be fetched.
 *          required: true
 *          schema:
 *             type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProfileResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/:id/profile', user_controller_1.getProfile);
/**
 * @openapi
 * /api/users/{id}/recipes:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a User recipes
 *     description: Fetch a recipe which user uploaded
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the chef to retrieve recipes.
 *         required: true
 *         schema:
 *           type: integer
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1
 *           maximum: 100
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeByIdResponse'
 *       404:
 *         description: Recipe Found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 */
router.get('/:id/recipes', recipe_controller_1.getUserRecipes);
router.use('/:id/collections', collection_routes_1.routerWithId);
/**
 * @openapi
 *  '/api/users/login':
 *   post:
 *      tags:
 *          - Users
 *      summary: Login Route
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginInput'
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthResponse'
 */
router.post('/login', auth_controller_1.login);
/**
 * @openapi
 *  '/api/users/verify':
 *   get:
 *      tags:
 *          - Users
 *      summary: Verify token
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthResponse'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error401'
 */
router.get('/verify', auth_controller_1.verify);
router.use('/collections', collection_routes_1.default);
router.use('/favorites', favorite_routes_1.default);
router.use('/shoppingList', shoppingList_routes_1.default);
exports.default = router;
