import { Router } from 'express';
import { getNutrition } from '../controllers/nutrition.controller';
const router = Router({ mergeParams: true });


/**
 * TODO
 * Route to calculate the recipe nutritional facts per 100g of the food.
 * Needs swagger documentation.
 * getNutrition controller needs to be completed.
 */
router.get('/', getNutrition);

export default router;