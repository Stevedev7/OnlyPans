import { Router } from 'express';
import { getAllCuisines, getCuisineById, getCuisineByName } from '../controllers/cuisine.controller';



const router = Router();
/**
 * @openapi
 *  '/api/cuisines/search':
 *      get:
 *          tags:
 *              - Cuisine
 *          summary: Search cuisine
 *          parameters:
 *          - in: query
 *            name: q
 *            schema: 
 *              type: string
 *              example: In
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error404'
 *              500:
 *                  description: Server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 */
router.get('/search', getCuisineByName);

/**
 * @openapi
 *  '/api/cuisines/all':
 *      get:
 *          tags:
 *              - Cuisine
 *          summary: Search cuisine
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error404'
 *              500:
 *                  description: Server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 */
router.get('/all', getAllCuisines);

/**
 * @openapi
 *  '/api/cuisines/{id}':
 *      get:
 *          tags:
 *              - Cuisine
 *          summary: Search cuisine
 *          parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: integer
 *              example: 1
 *            required: true
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error404'
 *              500:
 *                  description: Server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 */
router.get('/:id', getCuisineById);

export default router;