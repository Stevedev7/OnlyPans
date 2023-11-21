/**
 * @openapi
 *  components:
 *      schemas:
 *          Diet:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      example: Keto
 *                  description:
 *                      type: string
 *                      example: A high-fat, low-carbohydrate diet that aims to shift the body into a state of ketosis. While the traditional ketogenic diet includes animal products, a keto vegan variation excludes all animal-derived foods. It focuses on plant-based sources of healthy fats and low-carb vegetables while restricting grains, legumes, and high-carb fruits.
 *          DietsResponse:
 *              type: object
 *              properties:
 *                  data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Diet'
 *          DietIDResponse:
 *              type: object
 *              properties:
 *                  data:
 *                      type: object
 *                      $ref: '#/components/schemas/Diet'
 */


export interface Diet {
    id :number;
    name: string ;
    description:string;
}

export default Diet;