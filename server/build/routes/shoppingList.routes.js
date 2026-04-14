"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shoppingList_controller_1 = require("../controllers/shoppingList.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
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
router.get('/', auth_middleware_1.isLoggedIn, shoppingList_controller_1.getShoppingList);
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
router.post('/add', auth_middleware_1.isLoggedIn, shoppingList_controller_1.addIngredientToList);
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
router.delete('/:id', auth_middleware_1.isLoggedIn, shoppingList_controller_1.deleteIngredientFromShoppingList);
exports.default = router;
