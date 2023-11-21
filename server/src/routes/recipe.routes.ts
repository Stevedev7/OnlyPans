import { Router } from 'express';
import { 
    postRecipe, 
    getRecipeById, 
    getRecipesByCuisine, 
    getRecipesByDiet, 
    getAllRecipes, 
    deleteRecipeById, 
    getRecipesByCourse,
    putRecipe,
    getAverageRatings
} from '../controllers/recipe.controller';
import { isLoggedIn } from '../middleware/auth.middleware';
import nutritionRoutes from './nutrition.routes';
import reviewRoutes from './review.routes';

const router = Router();

/**
 * @openapi
 *  '/api/recipes/':
 *      get:
 *          tags:
 *              - Recipes
 *          summary: Get all recipes
 *          description: Route to get all recipe
 *          parameters:
 *          - name: page
 *            in: query
 *            schema: 
 *                type: integer
 *          - name: limit
 *            in: query
 *            schema: 
 *                type: integer
 *          - name: searchValue
 *            in: query
 *            schema: 
 *                type: string
 *          responses:
 *              200:
 *                  description: Created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  data: 
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/RescipeResponse'
 *                                  count:
 *                                      type: integer
 *                                      example: 1
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 *  
 */


router.get('/', getAllRecipes);

/**
 * @openapi
 *  '/api/recipes/new':
 *      post:
 *          tags:
 *              - Recipes
 *          summary: Publish recipe
 *          description: Route to create recipe
 *          security:
 *              - bearerAuth: []
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RecipeInput'
 *          responses:
 *              201:
 *                  description: Created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/RescipeResponse'
 *              401:
 *                  description: Unauthorized
 *              403:
 *                  description: Forbidden
 *  
 */
router.post('/new', isLoggedIn, postRecipe);

/**
 * @openapi
 * /api/recipes/{id}:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Get a recipe by ID
 *     description: Fetch a recipe by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the recipe to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeByIdResponse'
 *       404:
 *         description: Recipe not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 */

router.get('/:id', getRecipeById);

router.get('/:id/ratings', getAverageRatings);

/**
 * @openapi
 *  '/api/recipes/{id}':
 *      patch:
 *          tags:
 *              - Recipes
 *          summary: Update Recipe
 *          description: Route to update recipe
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              example: 2
 *            required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RecipeInput'
 *          responses:
 *              200:
 *                  description: Success
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
 *              403:
 *                  description: Forbidden
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error403'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 *              
 */

router.patch('/:id/', isLoggedIn, putRecipe);
/**
 * @openapi
 *  '/api/recipes/{id}':
 *      delete:
 *          tags:
 *              - Recipes
 *          summary: Delete recipe
 *          description: Route to delete a recipe
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              example: 2
 *            required: true
 *          responses:
 *              200:
 *                  description: Success
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
 *              403:
 *                  description: Forbidden
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error403'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Error500'
 *              
 */
router.delete('/:id', isLoggedIn, deleteRecipeById);

router.use('/:id/reviews', reviewRoutes);

/**
 * @openapi
 *  '/api/recipes/{id}/nutrition':
 *      get:
 *          tags:
 *              - Nutrition
 *          summary: Get Nutritional value
 *          description: Route to get nutritional value for recipes;
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: integer
 *                  example: 1
 *          responses:
 *              200:
 *                  decsription: Success
 */
router.use('/:id/nutrition', nutritionRoutes);
/**
 * @openapi
 * /api/recipes/cuisine/{id}:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Get a recipe by Cuisine
 *     description: Fetch a recipe by cuisines.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the cuisine to retrieve recipes.
 *         required: true
 *         schema:
 *           type: integer
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1
 *           maximum: 100
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeByIdResponse'
 *       404:
 *         description: Recipe Found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 */

router.get('/cuisine/:id', getRecipesByCuisine);


/**
 * @openapi
 * /api/recipes/diet/{id}:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Get a recipe by Diet
 *     description: Fetch a recipe by Diet.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the diet to retrieve recipes.
 *         required: true
 *         schema:
 *           type: integer
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1
 *           maximum: 100
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeByIdResponse'
 *       404:
 *         description: Recipe not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 */
router.get('/diet/:id', getRecipesByDiet);


/**
 * @openapi
 * /api/recipes/courses/{course}:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Get a recipe by Course
 *     description: Fetch a recipe by Course.
 *     parameters:
 *       - name: course
 *         in: path
 *         description: Name of the course to retrieve recipes.
 *         required: true
 *         schema:
 *           type: string
 *           example: Main_Course
 *           enum:
 *              - Appetizer
 *              - Main_Course
 *              - Dessert
 *              - Beverage
 *              - Salad
 *              - Soup
 *              - Breakfast
 *              - Bread
 *              - Side_Dish
 *              - Kid_Friendly
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1
 *           maximum: 100
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeByIdResponse'
 *       404:
 *         description: Recipe not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 */
router.get('/courses/:course', getRecipesByCourse);



export default router;