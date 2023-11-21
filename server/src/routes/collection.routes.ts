import { Router } from 'express';
import { isLoggedIn } from '../middleware/auth.middleware';
import { postCollection, getUserCollections, getCollectionById } from '../controllers/collection.controller';

const router = Router();

/**
 * @openapi
 *  '/api/users/collections':
 *      get:
 *          tags:
 *          - Collection
 *          summary: Get user collections
 *          description: Route to get usercollection
 *          security:
 *           - bearerAuth: []
 *          responses:
 *              200: 
 *                  description: Success
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

router.get('/', isLoggedIn, getUserCollections);

/**
 * @openapi
 *  '/api/users/collections/new':
 *      post:
 *          tags:
 *          - Collection
 *          summary: Create collection
 *          description: Route to create a new collection
 *          security:
 *           - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CollectionInput'
 *          responses:
 *              201: 
 *                  description: Created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/CollectionCreatedResponse'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error401'
 *              409:
 *                  description: Conflict
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error409'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 */
router.post('/new', isLoggedIn, postCollection);

/**
 * @openapi
 *  '/api/users/{userId}/collections/{id}':
 *      get:
 *          tags:
 *          - Collection
 *          summary: Get user collections by id
 *          description: Route to get usercollection
 *          parameters:
 *          - in: path
 *            name: userId
 *            schema: 
 *              type: integer
 *              example: 1
 *            required: true
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
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 */



export const routerWithId = Router({ mergeParams: true });
routerWithId.get('/:collectionId', getCollectionById);

export default router;