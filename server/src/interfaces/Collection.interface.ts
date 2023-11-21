/**
 * @openapi
 *  components:
 *      schemas:
 *          CollectionCreatedResponse:
 *              type: object    
 *              properties:
 *                  data:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                              example: 4
 *                          name:
 *                              type: string
 *                              example: New year
 *                          userId:
 *                              type: integer
 *                              example: 1
 *          CollectionInput:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      example: Christmas
 *              required:
 *                  - name
 */

export interface Collection {
    id?: number;
    name?: string;
}