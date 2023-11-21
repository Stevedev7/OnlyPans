import { Router } from 'express';
import { getAllUnits, getUnitById, getUnitByName } from '../controllers/unit.controller';




const router = Router();
/**
 * @openapi
 *  '/api/units/search':
 *      get:
 *          tags:
 *              - Unit
 *          summary: Search Unit
 *          parameters:
 *          - in: query
 *            name: q
 *            schema: 
 *              type: string
 *              example: cup
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
 *                                          $ref: '#/components/schemas/Unit'
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
router.get('/search', getUnitByName);

/**
 * @openapi
 *  '/api/units/all':
 *      get:
 *          tags:
 *              - Unit
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
 *                                          $ref: '#/components/schemas/Unit'
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
router.get('/all', getAllUnits);


/**
 * @openapi
 *  '/api/units/{id}':
 *      get:
 *          tags:
 *              - Unit
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
 *                                      $ref: '#/components/schemas/Unit'
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
router.get('/:id', getUnitById);

export default router;