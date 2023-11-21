import { Router } from 'express';
import { getAllAllergens, getAllergenById, getAllergenByName } from '../controllers/allergen.controller';



const router = Router();
/**
 * @openapi
 *  '/api/allergens/search':
 *      get:
 *          tags:
 *              - Allergen
 *          summary: Search Allergen
 *          parameters:
 *          - in: query
 *            name: q
 *            schema: 
 *              type: string
 *              example: s
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/Allergen'
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
router.get('/search', getAllergenByName);

/**
 * @openapi
 *  '/api/allergens/all':
 *      get:
 *          tags:
 *              - Allergen
 *          summary: Search Allergen
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/Allergen'
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

router.get('/all', getAllAllergens);
/**
 * @openapi
 *  '/api/allergens/{id}':
 *      get:
 *          tags:
 *              - Allergen
 *          summary: Search Allergen
 *          parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: number
 *              example: 1
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      $ref: '#/components/schemas/Allergen'
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
router.get('/:id', getAllergenById);

export default router;