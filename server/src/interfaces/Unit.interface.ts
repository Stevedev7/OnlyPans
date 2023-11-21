/**
 * @openapi
 *  components:
 *      schemas:
 *          Unit:
 *              type: object
 *              properties:
 *                  id: 
 *                      type: number
 *                      example: 2
 *                  name: 
 *                      type: string
 *                      example: cup
 * 
 */

export interface Unit {
    id: number;
    name: string;
    symbol: string;
}

export default Unit;