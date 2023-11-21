import { Router } from 'express';
import { isLoggedIn } from '../middleware/auth.middleware';
import { getFavorites, addRecipeToFavorites, isFavorite, removeRecipeFromFavorites } from '../controllers/favorite.controller';

const router = Router();


/**
 * @openapi
 *  '/api/users/favorites':
 *      get:
 *          tags:
 *              - Users
 *          summary: Favorites
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - name: page
 *                in: query
 *                schema:
 *                  type: integer
 *              - name: limit
 *                in: query
 *                schema:
 *                  type: integer
 *                
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/FavoritesResponse'
 *              401:
 *                  description: Conflict
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error401'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 */

router.get('/', isLoggedIn, getFavorites);


/**
 * @openapi
 *  '/api/users/favorites/add':
 *      post:
 *          tags:
 *              - Users
 *          summary: Add recipe to Favorites
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id: 
 *                                  type: integer
 *                                  example: 5
 *          responses:
 *              201:
 *                  description: Success
 *              401:
 *                  description: Conflict
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error401'
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error404'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 */

router.post('/remove', isLoggedIn, removeRecipeFromFavorites);

/**
 * @openapi
 *  '/api/users/favorites/remove':
 *      post:
 *          tags:
 *              - Users
 *          summary: Add recipe to Favorites
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id: 
 *                                  type: integer
 *                                  example: 5
 *          responses:
 *              201:
 *                  description: Success
 *              401:
 *                  description: Conflict
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error401'
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error404'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 */

router.post('/add', isLoggedIn, addRecipeToFavorites);

/**
 * @openapi
 *  '/api/users/favorites/{id}':
 *      get:
 *          tags:
 *              - Users
 *          summary: Favorites
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - name: id
 *                in: path
 *                requred: true
 *                schema:
 *                    type: string
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/FavoritesResponse'
 *              401:
 *                  description: Conflict
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error401'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 */

router.get('/:id', isLoggedIn, isFavorite);

export default router;