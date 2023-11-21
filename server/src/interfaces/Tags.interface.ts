/**
 * @openapi
 *  components:
 *      schemas:
 *          Tag:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 1
 *                  text:
 *                      type: string
 *                      example: indian
 *          TagsSearchResponse:
 *              type: object
 *              properties:
 *                  data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Tag'
 *                  count:
 *                      type: integer
 *                      example: 1
 *          TagsInput:
 *              type: object
 *              properties:
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              text:
 *                                  type: string
 *                                  example: yummy
 *                          required:
 *                              - text
 *              required:
 *                  - tags
 *          TagsResponse:
 *              type: number
 *              example: 3
 * 
 *          TagsResponse200:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      example: The tags already exist.
 *                  tags:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/TagsResponse'
 *          TagsResponse201:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      example: Tags added.
 *                  tags:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/TagsResponse'
 *          TagsResponse400:
 *              type: object
 *              properties:
 *                  error:
 *                      type: string
 *                      example: You can add only 25 tags at once.
 */

export interface Tag {
    id: number;
    text: string;
}

export default Tag