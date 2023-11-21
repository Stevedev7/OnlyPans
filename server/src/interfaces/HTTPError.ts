/**
 * @openapi
 *  components:
 *      schemas:
 *          Error403:
 *              type: object
 *              properties:
 *                  error: 
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Forbidden
 *                  data:
 *                      example: null
 *          Error400:
 *              type: object
 *              properties:
 *                  error: 
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Bad Request
 *                  data:
 *                      example: null
 *          Error401:
 *              type: object
 *              properties:
 *                  error: 
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Unauthorized
 *                  data:
 *                      example: null
 *          Error409:
 *              type: object
 *              properties:
 *                  error: 
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Conflict
 *                  data:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                              example: 1
 *                          rating:
 *                              type: integer
 *                              example: 5
 *                          review:
 *                              type: string
 *                              example: Very good.
 *          Error404:
 *              type: object
 *              properties:
 *                  error: 
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Not Found
 *                  data:
 *                      example: null
 *          Error500:
 *              type: object
 *              properties:
 *                  error: 
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Something went wrong.
 *                  data:
 *                      example: null
 */


export interface HTTPError extends Error{
    status?: number;
    data?: unknown;
}