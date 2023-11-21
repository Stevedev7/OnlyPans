import { Router } from 'express';
import { getIngredientByID, getIngredients, searchIngredients } from '../controllers/ingredient.controller';
const router = Router();


/**
 * @openapi
 * '/api/ingredients':
 *  get:
 *     tags:
 *     - Ingredient
 *     summary: Get ingredients
 *     description: Route to get ingredients
 *     parameters:
 *     - in: query
 *       name: page
 *       schema:
 *          type: integer
 *          example: 180
 *          minimum: 0
 * 
 *     - in: query
 *       name: limit
 *       schema:
 *          type: integer
 *          example: 1
 *          minimum: 0
 *          maximum: 100

 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IngredientsResponse'
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error409'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error400'
 */
router.get('/', getIngredients);

/**
 * @openapi
 * '/api/ingredients/search':
 *  get:
 *      tags:
 *      - Ingredient
 *      summary: Search 
 *      description: Route to search for ingredients
 *      parameters:
 *      - in: query
 *        name: q
 *        required: true
 *        schema:
 *            type: string
 *            example: Egg
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not found
*/
router.get('/search', searchIngredients);

/**
 * @openapi
 * '/api/ingredients/{id}':
 *  get:
 *      tags:
 *      - Ingredient
 *      summary: Search 
 *      description: Route to search for ingredients
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *            type: integer
 *            example: 182
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/IngredientResponse'
 *          409:
 *              description: Conflict
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error409'
 *          400:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error400'
*/
router.get('/:id', getIngredientByID);

export default router;