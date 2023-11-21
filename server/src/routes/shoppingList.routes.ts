import { Router } from 'express';
import { getShoppingList, addIngredientToList, deleteIngredientFromShoppingList } from '../controllers/shoppingList.controller';
import { isLoggedIn } from '../middleware/auth.middleware';

const router = Router();

/**
 * @openapi
 *  '/api/users/shoppingList':
 *      get:
 *          tags:
 *              - Shopping List
 *          summary: Get user shoppinglist
 *          description: A Route to get user's shoppinglist
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  data: 
 *                                      $ref: '#/components/schemas/ShoppingListResponse'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error401'
 */
router.get('/', isLoggedIn, getShoppingList);


/**
 * @openapi
 *  '/api/users/shoppingList/add':
 *      post:
 *          tags:
 *              - Shopping List
 *          summary: Get user shoppinglist
 *          description: A Route to get user's shoppinglist
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ingredient:
 *                                  type: integer
 *                                  example: 180
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Ingredient added
 *                                  data: 
 *                                      $ref: '#/components/schemas/ShoppingListResponse'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error401'
 */

router.post('/add', isLoggedIn, addIngredientToList);


/**
 * @openapi
 *  '/api/users/shoppingList/{id}':
 *      delete:
 *          tags:
 *              - Shopping List
 *          summary: Get user shoppinglist
 *          description: A Route to remove ingredient user's shoppinglist
 *          parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: integer
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Ingredient removed
 *                                  data: 
 *                                      $ref: '#/components/schemas/ShoppingListResponse'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error401'
 */

router.delete('/:id', isLoggedIn, deleteIngredientFromShoppingList);

export default router;