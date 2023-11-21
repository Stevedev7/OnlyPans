/**
 * @openapi
 *  components:
 *      schemas:
 *          IngredientsResponse:
 *              type: object
 *              properties:
 *                  data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/IngredientResponse'
 *                  limit:
 *                      type: integer
 *                      example: 1
 *                  skip:
 *                      type: integer
 *                      example: 180
 *          IngredientsSearchResponse:
 *              type: object
 *              properties:
 *                  data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/IngredientResponse'
 *                  searchTerm:
 *                      type: string
 *          IngredientResponse:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 241
 *                  name:
 *                      type: string
 *                      example: Basmati
 *                  servingSize:
 *                      type: integer
 *                      example: 1
 *                  servingSizeName:
 *                      type: string
 *                      example: cup
 *                  inGrams:
 *                      type: integer
 *                      example: 158
 *                  calories:
 *                      type: integer
 *                      example: 205
 *                  totalFat:
 *                      type: float
 *                      example: 0.4
 *                  saturatedFat:
 *                      type: float
 *                      example: 0.1
 *                  transFat:
 *                      type: float
 *                      example: 0
 *                  cholesherol:
 *                      type: float
 *                      example: 0
 *                  sodium:
 *                      type: float
 *                      example: 1.6
 *                  totalCarbs:
 *                      type: float
 *                      example: 45
 *                  sugar:
 *                      type: float
 *                      example: 0.1
 *                  protein:
 *                      type: float
 *                      example: 4.3
 *                  calcium:
 *                      type: float
 *                      example: 16
 *                  iron:
 *                      type: float
 *                      example: 1.9
 *                  potassium:
 *                      type: float
 *                      example: 55.3
 *          IngredientInput:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      example: Basmati
 *                  servingSize:
 *                      type: integer
 *                      example: 1
 *                  servingSizeName:
 *                      type: string
 *                      example: cup
 *                  inGrams:
 *                      type: integer
 *                      example: 158
 *                  calories:
 *                      type: integer
 *                      example: 205
 *                  totalFat:
 *                      type: float
 *                      example: 0.4
 *                  saturatedFat:
 *                      type: float
 *                      example: 0.1
 *                  transFat:
 *                      type: float
 *                      example: 0
 *                  cholesherol:
 *                      type: float
 *                      example: 0
 *                  sodium:
 *                      type: float
 *                      example: 1.6
 *                  totalCarbs:
 *                      type: float
 *                      example: 45
 *                  sugar:
 *                      type: float
 *                      example: 0.1
 *                  protein:
 *                      type: float
 *                      example: 4.3
 *                  calcium:
 *                      type: float
 *                      example: 16
 *                  iron:
 *                      type: float
 *                      example: 1.9
 *                  potassium:
 *                      type: float
 *                      example: 55.3
 * 
 *              required:
 *                  - name
 *                  - servingSize
 *                  - servingSizeNAme
 *                  - inGrams
 *                  - calories
 *                  - totalFat
 *                  - saturatedFat
 *                  - transFat
 *                  - cholesterol
 *                  - sodium
 *                  - totalCarbs
 *                  - sugar
 *                  - protein
 *                  - calcium
 *                  - iron
 *                  - potassium
 * 
 *          RecipeIngredientsOutput:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 181
 *                  name:
 *                      type: string
 *                      example: Basmati
 *                  quantity:
 *                      type: integer
 *                      example: 4
 *                  unit:
 *                      type: integer
 *                      example: 2
 *
 *          RecipeIngredientsInput:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 181
 *                  quantity:
 *                      type: integer
 *                      example: 4
 *                  unit:
 *                      type: integer
 *                      example: 2
 *              required:
 *              - id
 *              - quantity
 *              - unit
 *              
 */

export interface Ingredient {
    id: number;
    name: string;
    servingSize: number;
    servingSizeName: number;
    inGrams: number;
    calories: number;
    totalFat: number;
    saturatedFat: number;
    transFat: number;
    cholestrol: number;
    sodium: number;
    totalCarbs: number;
    sugar: number;
    protein: number;
    calcium: number;
    iron: number;
    potassium: number;
}

export default Ingredient;