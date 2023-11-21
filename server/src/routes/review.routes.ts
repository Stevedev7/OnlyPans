import { Router } from 'express';
import { postReview, deleteReview, getReview } from '../controllers/review.controller';
import { isLoggedIn } from '../middleware/auth.middleware';

const router = Router({ mergeParams: true });


/**
 * @openapi
 *  '/api/recipes/{id}/reviews/new':
 *      post:
 *          tags:
 *              - Review
 *          summary: Add review
 *          description: A Route to post a new review to a recipe.
 *          security:
 *              - bearerAuth: []
 *          parameters: 
 *              - name: id
 *                in: path
 *                description: The ID of the recipe to which you want to review
 *                required: true
 *                schema:
 *                    type: integer
 *                    example: 3
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              review:
 *                                  type: string
 *                                  example: Tasty
 *                              rating:
 *                                  type: integer
 *                                  minimum: 1
 *                                  maximum: 5
 *                                  example: 5
 *          responses:
 *              201:
 *                  description: Created
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Review added
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error404'
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
 *                  
 */
router.post('/new', isLoggedIn, postReview);


/**
 * @openapi
 *  /api/recipes/{id}/reviews/{reviewId}:
 *      delete:
 *          tags:
 *              - Review
 *          summary: Delete review
 *          description: A Route to delete review.
 *          security:
 *              - bearerAuth: []
 *          parameters: 
 *              - name: id
 *                in: path
 *                description: The ID of the recipe to which you want to review
 *                required: true
 *                schema:
 *                    type: integer
 *                    example: 3
 *              - name: reviewId
 *                in: path
 *                description: The ID of the recipe to which you want to review
 *                required: true
 *                schema:
 *                    type: integer
 *                    example: 4
 *          responses:
 *              200:
 *                  description: OK
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Review deleted
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          id: 
 *                                              type: integer
 *                                              example: 5
 *                                          recipeId: 
 *                                              type: integer
 *                                              example: 3
 *                                          userId: 
 *                                              type: integer
 *                                              example: 1
 *                                          rating: 
 *                                              type: integer
 *                                              example: 5
 *                                          review: 
 *                                              type: string
 *                                              example: Tasty
 *              401:
 *                  description: Unauthorized
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
 *              409:
 *                  description: Conflict
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Review409'
 */
router.delete('/:reviewId', isLoggedIn, deleteReview);


/**
 * @openapi
 *  /api/recipes/{id}/reviews:
 *      get:
 *          tags:
 *              - Review
 *          summary: Get reviews of a particular recipe
 *          description: A Route to get review.
 *          parameters: 
 *              - name: id
 *                in: path
 *                description: The ID of the recipe to which you want to review
 *                required: true
 *                schema:
 *                    type: integer
 *                    example: 3
 *              - name: page
 *                in: path
 *                description: Page number
 *                schema:
 *                    type: integer
 *              - name: limit
 *                in: path
 *                description: Limit per page
 *                schema:
 *                    type: integer
 *          responses:
 *              200:
 *                  description: OK
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      data:
 *                                          type: object
 *                                          properties:
 *                                              id: 
 *                                                  type: integer
 *                                                  example: 5
 *                                              recipeId: 
 *                                                  type: integer
 *                                                  example: 3
 *                                              userId: 
 *                                                  type: integer
 *                                                  example: 1
 *                                              rating: 
 *                                                  type: integer
 *                                                  example: 5
 *                                              review: 
 *                                                  type: string
 *                                                  example: Tasty
 *              404:
 *                  description: Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error404'
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error400'
 */

router.get('/', getReview);

export default router;