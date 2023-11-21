import { Router } from 'express';
import { getProfile, register } from '../controllers/user.controller';
import { login, verify } from '../controllers/auth.controller';
import collectionRoutes, { routerWithId as collectionsWithUserIdRoutes } from './collection.routes';
import favoriteRoutes from './favorite.routes';
import shoppingListRoutes from './shoppingList.routes';
import { getUserRecipes } from '../controllers/recipe.controller';
const router = Router();

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
router.post('/register', register);

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
router.get('/:id/profile', getProfile);

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

router.get('/:id/recipes', getUserRecipes);


router.use('/:id/collections', collectionsWithUserIdRoutes);



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
router.post('/login', login);

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
router.get('/verify', verify);

router.use('/collections', collectionRoutes);

router.use('/favorites', favoriteRoutes);

router.use('/shoppingList', shoppingListRoutes);

export default router;