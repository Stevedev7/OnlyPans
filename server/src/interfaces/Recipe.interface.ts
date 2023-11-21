import { UserProfile } from '@prisma/client';
import Ingredient from './Ingredient.interface';
import Cuisine from './Cuisine.interface';

/**
 * @openapi
 *  components:
 *      schemas:
 *          RecipeByIdIngredient:
 *              type: object
 *              properties:
 *                  id: 
 *                      type: integer
 *                      example: 180
 *                  name: 
 *                      type: string
 *                      example: Basmati Rice
 *                  unit:
 *                      type: string
 *                      example: cup
 *                  quantity:
 *                      type: number
 *                      example: 4
 *          RecipeById: 
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 4
 *                  title:
 *                      type: string
 *                      example: Biryani
 *                  description:
 *                      type: string
 *                      example: This is an indian dish
 *                  createdAt:  
 *                      type: string
 *                      example: 2023-07-21T09:50:35.201Z
 *                  ingredients:
 *                      type: array
 *                      items:
 *                          items:
 *                              $ref: '#/components/schemas/RecipeByIdIngredient'
 *                  steps:
 *                      type: array
 *                      items:
 *                          type: string
 *                      example: ["step1", "step2", "step3"]
 *                  chef:
 *                      $ref: '#/components/schemas/ProfileResponse'
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *                      example: ["indian", "spicy", "yummy"]
 *                  diet:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                              example: 10
 *                          name: 
 *                              type: string
 *                              example: Nut-Free
 *                  cuisine:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                              example: 14
 *                          name: 
 *                              type: string
 *                              example: Indian
 *                  allergen:
 *                      type: array
 *                      items:
 *                          type: string
 *                      example: ["Dairy"]
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                      example: [ "https://media.istockphoto.com/photos/chicken-biryani14-picture-id501137061" ]

 *          RecipeByIdResponse:
 *              type: object
 *              properties:
 *                  data:
 *                      $ref: '#/components/schemas/RecipeById'
 *          RecipeInput:
 *              type: object
 *              properties: 
 *                  title:
 *                      type: string
 *                      example: Biryani
 *                  description:
 *                      type: string
 *                      example: Biryani
 *                  cuisine:
 *                      type: integer
 *                      example: 14
 *                  steps:
 *                      type: array
 *                      items:
 *                          type: string
 *                      example: ["step1", "step2", "step3"]
 *                  tags: 
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              id: 
 *                                  type: integer
 *                                  example: 1
 *                              text:
 *                                  type: string
 *                                  example: spicy
 *                  diet:
 *                      type: integer
 *                      example: 10
 *                  ingredients:
 *                      type: array
 *                      items:
 *                          allOf:
 *                          - $ref: '#/components/schemas/RecipeIngredientsInput'
 *                  images: 
 *                      type: array 
 *                      items:
 *                          type: string
 *                      example: [ "https://media.istockphoto.com/photos/chicken-biryani14-picture-id501137061" ]
 *                  course:
 *                      type: string
 *                      example: Main_Course
 *                      enum:
 *                      - Appetizer
 *                      - Main_Course
 *                      - Dessert
 *                      - Beverage
 *                      - Salad
 *                      - Soup
 *                      - Breakfast
 *                      - Bread
 *                      - Side_Dish
 *                      - Kid_Friendly
 *                  allergen:
 *                      type: array
 *                      items:
 *                          type: integer
 *                      example: [ 2 ]
 *              required:
 *              - title
 *              - description
 *              - cuisine
 *              - steps
 *              - tags
 *              - diet
 *              - ingredients
 *              - images
 *              - course
 *              - allergen
 *          CreatedRecipe:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 4
 *                  title:
 *                      type: string
 *                      example: Biryani
 *                  description:
 *                      type: string
 *                      example: This is an Indian dish
 *                  chefId:
 *                      type: integer
 *                      example: 1
 *                  createdAt:
 *                      type: string
 *                      example: 2023-07-21T09:50:35.201Z
 *                  updatedAt:
 *                      type: string
 *                      example: 2023-07-21T09:50:35.201Z
 *                  cuisineId:
 *                      type: integer
 *                      example: 14
 *                  dietId:
 *                      type: integer
 *                      example: 10
 *                  course:
 *                      type: string
 *                      example: Main_Course
 *          RescipeResponse:
 *              type: object
 *              properties:
 *                  data:
 *                      $ref: '#/components/schemas/CreatedRecipe'
 *          
 *            
 */

export interface Recipe {
    id: number;
    title: string;
    description?: string;
    chefId: UserProfile['id']
    createdAt: Date;
    updatedAt: Date;
    steps: null;
    cuisineId: Cuisine['id'];
    course: Course
    ingredients: Array<Ingredient['id']>
}

export enum Course {
    appetizer = 'Appetizer',
    mains = 'Main_Course',
    dessert = 'Dessert',
    beverage = 'Beverage',
    salad = 'Salad',
    soup = 'Soup',
    breakfast = 'Breakfast',
    bread = 'Bread',
    side = 'SideDish',
    kids = 'Kid_Friendly',
}

export default Recipe;