/**
 * @openapi
 *  components:
 *      schemas:
 *          Allergen:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      example: 1
 *                  name:
 *                      type: string
 *                      example: Wheat
 */


export interface Allergen {
    id: number;
    name: string;
}

export default Allergen;