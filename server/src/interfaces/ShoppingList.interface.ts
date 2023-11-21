import Ingredient from './Ingredient.interface';
import User from './User.interface';

/**
 * @openapi
 *  components:
 *      schemas:
 *          ShoppingListResponse:
 *              type: object
 *              properties:
 *                  id: 
 *                      type: number
 *                      example: 1
 *                  ingredients:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              id: 
 *                                  type: integer
 *                                  example: 180
 *                              name: 
 *                                  type: string
 *                                  example: Basmati
 */

interface ShoppingList {
    id: number;
    ingredients: Ingredient;
    user: User;
}

export default ShoppingList;